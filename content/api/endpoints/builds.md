## Builds

* [chapter1](#chapter1)
* [chapter2](#chapter2)

### <a name="chapter1"></a>Get a build

`GET /application/builds`

#### Response

```
Status: 200 OK
Link:
<https://api.github.com/resource?page=2>; rel="next",
<https://api.github.com/resource?page=5>; rel="last"
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
```
``` json [
  {
    "login": "github",
    "id": 1,
    "url": "https://api.github.com/orgs/github",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "description": "A great organization"
  }
]```

### <a name="chapter2"></a>Chapter2

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
