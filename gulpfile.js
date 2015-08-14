var assert = require('assert');
var assign = require('object-assign');
var browserify = require('browserify');
var concat = require('gulp-concat');
var dtj = require('directory-to-json');
var envify = require('envify/custom');
var flatten = require('gulp-flatten');
var frontMatter = require('gulp-front-matter');
var gulp = require('gulp');
var gulpsmith = require('gulpsmith');
var highlight = require('metalsmith-metallic');
var livereload = require('gulp-livereload');
var markdown = require('metalsmith-markdown');
var title = require('metalsmith-title');
var myth = require('gulp-myth');
var path = require('path');
var source = require('vinyl-source-stream');
var spawn = require('child_process').spawn;
var streamify = require('gulp-streamify');
var templates = require('metalsmith-templates');
var through = require('through2');
var uglify = require('gulp-uglify');
var walk = require('walk')
var fs = require('fs')
var url = require('url');
var checkPages = require("check-pages");


module.exports = gulp;

/**
 * Paths.
 */
var jsFiles = [
  '*.js*',
  '**/*.js*',
  '!node_modules/**/*.js',
  '!**/node_modules/*.js*'
];

var moduleEntryPoint = [
  path.join(__dirname, 'index.js')
];

var docs = {
  docs: [
    'content/docs/**/*.md',
    'content/docs/*.md'
  ],
  api: [
    'content/api/**/*.md',
    'content/api/*.md'
  ],
  quickstarts: [
    'content/quickstarts/**/*.md',
    'content/quickstarts/*.md'
  ],
  index: [
    'content/index/**/*.md',
    'content/index/*.md'
  ],
  learn: [
    'content/learn/**/*.md',
    'content/learn/*.md'
  ],
  error: [
    'content/error/*.md'
  ]
};

var styleFiles = ['index.css'];

var imageFiles = [
  '**/*.jpg',
  '**/*.png',
  '**/*.gif',
  '**/*.svg',
  '**/*.ico',
  'content/**/*.jpg',
  'content/**/*.png',
  'content/**/*.gif',
  'content/**/*.svg'
];

var fontFiles = [
  '**/*.eot',
  '**/*.ttf',
  '**/*.woff',
  '**/*.woff2'
];

/**
 * Compile CSS
 */
gulp.task('styles', function () {
  return gulp
    .src(styleFiles)
    .pipe(concat('build.css'))
    .pipe(myth())
    .pipe(gulp.dest(path.join(__dirname, '/build/')));
});

/**
 * Compile JS
 */
gulp.task('modules', function () {
  var env = process.env.NODE_ENV || 'development';
  var debug = (env === 'development');
  var opts = {
    path: path.resolve('./content'),
    noDot: true
  };
  dtj(opts, './build/db.json', function (err) {
    if (err) return console.log(err);
    bundle();
  });

  function bundle () {
    browserify(moduleEntryPoint)
      .transform('brfs')
      .transform(envify({NODE_ENV: env}))
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(debug ? through.obj() : streamify(uglify()))
      .pipe(gulp.dest(path.join(__dirname, '/build/')));
  }
});

/**
 * Compile docs.
 */
gulp.task('docs', function () {
  Object.keys(docs).forEach(function (key) {
    buildTemplate(key);
  });
});

/**
 * Copy assets
 */
gulp.task('assets', function () {
  return gulp
    .src(imageFiles)
    .pipe(flatten())
    .pipe(gulp.dest(path.join(__dirname, '/build/images')));
});

/**
 * Copy fonts
 */
gulp.task('fonts', function () {
  return gulp
    .src(fontFiles)
    .pipe(flatten())
    .pipe(gulp.dest(path.join(__dirname, '/build/fonts')));
});

/**
 * Lint files
 */
gulp.task('lint', function () {
  var childProcess = Object.create(process);
  childProcess.env.NODE_ENV = 'test';
  var args = [
    path.join(__dirname, './node_modules/.bin/eslint'),
    '.'
  ];
  spawn(process.argv[0], args, {stdio: [0, 1, 2], env: childProcess.env});
});


/**
 * Watch for file changes
 */
gulp.task('watch', function () {
  // determine which folders to watch for doc changes.
  var watchDocs = [];
  Object.keys(docs).forEach(function (key) {
    watchDocs.push('content/' + key + '/*.md');
    watchDocs.push('content/' + key + '/**/*.md');
    watchDocs.push('content/' + key + '/index.html');
  });

  gulp.watch(['/build/**']).on('change', livereload.changed);
  gulp.watch(jsFiles, ['modules']);
  gulp.watch([watchDocs], ['docs']);
  gulp.watch(styleFiles, ['styles']);
  livereload.listen();
});

/**
 * Check links
 */
gulp.task('checkLinks', function(cb) {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  connect().use(serveStatic(path.join(__dirname, "build"))).listen(1337);
    var options = {
      pageUrls: ['http://localhost:1337'],
      checkLinks: true,
      onlySameDomain: true,
      queryHashes: true,
      noRedirects: true,
      noLocalLinks: false,
      noEmptyFragments: true,
      linksToIgnore: [
      ],
      checkXhtml: false,
      checkCaching: true,
      checkCompression: true,
      maxResponseTime: 200,
      userAgent: 'custom-user-agent/1.2.3',
      summary: true
    };
    checkPages(console, options, cb);
});

gulp.task('checkDev', function() {
  var links = []
  var contentPathLength = path.join(__dirname, "content").length;
  var walkOptions = {
    followLinks: false,
    filters: ['node_modules', '.git', 'legacy-docs'],
  }
  walker = walk.walk(path.resolve("."), walkOptions);
    
  console.log(path.resolve('.'));
  walker.on("file", function (root, fileStats, next) {
    if (fileStats.name.length - fileStats.name.indexOf(".md") - 3 !== 0) {
      next();
        return
    }
    fs.readFile(path.resolve(root, fileStats.name), 'utf8', function (err, data) {
       //var re = /\[.+\]\((:?[^)]+)\)/g;
       var re = /\[([^\]]+)\]\(([^)"]+)(?: \"([^\"]+)\")?\)/g
       //var found = data.match(re);
       while (found = re.exec(data)) {
         var urlString = found[2];
         if (urlString.indexOf('http://') !== 0 && urlString.indexOf('https://') !== 0) {
           if (urlString.indexOf('/') != 0) {
             urlString = root.substring(contentPathLength) + '/' + urlString
           }
         }
         var l = url.parse(urlString);
         links.push(url.format(l));
       }
      next();
    });
  });

  walker.on("end", function() {
    console.log(links);
  });
});

/**
 * build
 */
gulp.task('build', [
  'content',
  'assets',
  'fonts'
]);

/**
 * content
 */
gulp.task('content', [
  'docs',
  'modules',
  'styles'
]);

/**
 * Default
 */
gulp.task('default', [
  'build',
  'watch'
]);

/**
 * Build a template.
 * TODO: move to module.
 *
 * @param {String} tn
 * @api private
 */
function buildTemplate (tn) {
  assert.equal(typeof tn, 'string', 'TemplateName should be a string');

  var outDir = tn === 'index' ? '' : tn;

  var metalPipe = gulpsmith()
    .use(highlight())
    .use(markdown({
      smartypants: true,
      gfm: true
    }))
    .use(title())
    .use(templates({
      engine: 'mustache',
      directory: 'content/' + tn
    }));

  function parseFile (file) {
    assign(file, {template: 'index.html'});
    delete file.frontMatter;
  }

  gulp
    .src(docs[tn])
    .pipe(frontMatter()).on('data', parseFile)
    .pipe(metalPipe)
    .pipe(gulp.dest('./build/' + outDir));
}
