const browserify = require('browserify');
const brick = require('brick-router');
const watchify = require('watchify');
const npm = require('rework-npm');
const rework = require('rework');
const path = require('path');
const myth = require('myth');
const bl = require('bl');
const fs = require('fs');

const root = path.dirname(require.main.filename);
const router = brick();

var b = browserify({
  cache: {},
  packageCache: {},
  entries: [path.join(root, 'index.js')],
  fullPaths: true
});
if (process.env.NODE_ENV === 'development') b = watchify(b);

module.exports = router;

// browserify bundle
router.on('/bundle.js', function (cb) {
  b.bundle().pipe(bl(function (err, buffer) {
    if (err) return cb(err);
    cb(null, buffer);
  }));
});

// myth bundle
router.on('/build.css', function (cb) {
  const route = path.join(root, 'index.css');
  fs.readFile(route, 'utf8', function (err, styles) {
    if (err) return cb(err);
    const res = rework(styles, {source: route})
      .use(myth({source: route}))
      .use(npm({root: root}));
    cb(null, res.toString());
  });
});
