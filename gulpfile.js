/*eslint no-console: 0 camelcase: 0*/

/**
 * Module dependencies
 */

var mustache = require('metalsmith-templates').mustache;
var templates = require('metalsmith-templates');
var frontMatter = require('gulp-front-matter');
var highlight = require('metalsmith-metallic');
var markdown = require('metalsmith-markdown');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var spawn = require('child_process').spawn;
// var lunr = require('metalsmith-lunr');
var browserify = require('browserify');
var metalsmith = require('metalsmith');
var flatten = require('gulp-flatten');
var envify = require('envify/custom');
var lunr = require('metalsmith-lunr');
var assign = require('object-assign');
var gulpsmith = require('gulpsmith');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var myth = require('gulp-myth');
var gulp = require('gulp');
var path = require('path');

/**
 * Exports
 */

module.exports = gulp;

var baseUrl = process.env.NODE_ENV == 'development'
  ? 'http://localhost:' + process.env.PORT + '/'
  : 'https://docs.wercker.com/';

/**
 * Paths.
 */

var jsFiles = [
  '*.js',
  'local_modules/**/*.js',
  '!local_modules/**/node_modules/*.js'
];

var moduleEntryPoint = [
  path.join(__dirname, 'index.js')
];

var docs = [
  'docs/**/*.md',
  'docs/*.md'
];

var styleFiles = [
  'node_modules/css-wipe/index.css',
  'node_modules/@local/wercker-animations/index.css',
  'node_modules/@local/wercker-colors/index.css',
  'node_modules/@local/wercker-typography/index.css',
  'local_modules/**/*.css'
];

/**
 * Compile CSS
 */

gulp.task('styles', function() {
  gulp
    .src(styleFiles)
    .pipe(concat('build.css'))
    .pipe(myth())
    .pipe(sass())
    .pipe(gulp.dest(path.join(__dirname, '/build/')));
});

/**
 * Compile JS
 */

gulp.task('modules', function() {
  var env = process.env.NODE_ENV || 'development';
  var debug = (env !== 'production');

  browserify(moduleEntryPoint, {debug: debug})
    .transform('brfs')
    .transform(envify({NODE_ENV: env}))
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest(path.join(__dirname, '/build/')));
});

/**
 * Compile docs.
 */

gulp.task('docs', function() {

  // https://github.com/CMClay/metalsmith-lunr
  var metalPipe = gulpsmith()
    .use(markdown({
      smartypants: true,
      gfm: true
    }))
    .use(templates({
      buildPath: '\"' + baseUrl + 'build.js' + '\"',
      stylePath: '\"' + baseUrl + 'build.css' + '\"',
      engine: 'mustache',
      directory: 'node_modules/@local/template'
    }))
    .use(highlight());

  function parseFile(file) {
    assign(file, file.frontMatter);
    delete file.frontMatter;
  }

  gulp
    .src(docs)
    .pipe(frontMatter()).on('data', parseFile)
    .pipe(metalPipe)
    .pipe(gulp.dest('./build'));
});

/**
 * Lint files
 */

gulp.task('lint', function() {
  var childProcess = Object.create(process);
  childProcess.env.NODE_ENV = 'test';
  var args = [
    path.join(__dirname, './node_modules/.bin/eslint'),
    '.'
  ];
  spawn(process.argv[0], args, {stdio: [0,1,2], env: childProcess.env});
});

/**
 * Watch for file changes
 */

gulp.task('watch', function() {
  gulp.watch(['/build/**']).on('change', livereload.changed);
  gulp.watch(jsFiles, [/*'lint',*/ 'modules']);
  gulp.watch([docs, 'local_modules/template/*'], ['docs']);
  gulp.watch(styleFiles, ['styles']);
  livereload.listen();
});

/**
 * build
 */

gulp.task('build', [
  'docs',
  'modules',
  'styles'
]);

/**
 * Default
 */

gulp.task('default', [
  'build',
  //'lint',
  'watch'
]);
