# docs-build

Build all assets. Can be used as either a router for an http server or as a 
static file generator. Uses [brick-router](https://github.com/yoshuawuyts/brick-router)
under the hood.

## Usage
```js
const router = require('@docs/build')

// match a path on the router. You generally
// want to wrap this in an http server.
router.match('/myPath.txt', function (err, res) {
  if (err) return console.error(err)
  console.log(res)
})

// write files to output dir
router.build('/my/output/dir', function (err, res) {
  if (err) return console.error(err)
})
```

## See Also:
- [brick-router](https://github.com/yoshuawuyts/brick-router) - Modular router for serving static assets
