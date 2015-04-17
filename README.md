# wercker-docs

[![wercker status](https://app.wercker.com/status/05eb642a41844e42b392d2db39bb7552/m "wercker status")](https://app.wercker.com/project/bykey/05eb642a41844e42b392d2db39bb7552)

Wercker docs built with [gulp][gulp] and [metalsmith][metalsmith].

## Installation
With [node][node] and [npm@2][npm] installed:
```sh
git clone https://github.com/wercker/docs
cd docs
npm install
```

## Building
Build:
```bash
make
```

## Live reload while working

In one terminal run:
```sh
make watch
```

and in another run:

```sh
make open
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[gulp]: http://gulpjs.com
[metalsmith]: http://www.metalsmith.io/
[node]: http://nodejs.com
[npm]: http://npmjs.com
