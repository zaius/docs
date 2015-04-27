## Nodejs

Below a small code sample to authenticate and retrieve data about an
application on wercker in Node.js using the
[request library](https://www.npmjs.com/package/request).

```javascript
var request = require('request');

var options = {
  url: 'https://app.wercker.com/api/v3/applications/wercker/docs',
  headers: {
    'Authorization': 'Bearer <TOKEN>'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    console.log(result)
  }
  else {
    console.log(error)
  }
}

request(options, callback);
```