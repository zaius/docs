## Builds

* [Get a build](#get-a-build)

### <a name="get-a-build" class="anchor"></a>Get a build

Get the details of a single build.

***
`GET /api/v3/builds/:build`
***

#### Response

```
Status: 200 OK
```

```json
{
  "status": "finished",
  "startedAt": "2015-04-30T17:06:04.686Z",
  "result": "passed",
  "id": "554260f7dc16db44791955a7",
  "url": "https://app.wercker.com/api/v3/builds/554260f7dc16db44791955a7",
  "application": {
    "stack": 5,
    "privacy": "public",
    "createdAt": "2015-01-28T17:04:09.851Z",
    "owner": {
      "meta": {
        "werckerEmployee": false,
        "username": "wercker"
      },
      "userId": "55310d295732ce8a41000054",
      "avatar": {
        "gravatar": "33a5bfbcf8a2b90f40e849b6f1fa5eeb"
      },
      "name": "wercker",
      "type": "wercker"
    },
    "name": "docs",
    "url": "https://app.wercker.com/api/v3/applications/wercker/docs",
    "id": "54c9168980c7075225004157"
  },
  "branch": "hide_api",
  "createdAt": "2015-04-30T17:05:59.209Z",
  "finishedAt": "2015-04-30T17:09:02.753Z",
  "message": "Hide API header",
  "progress": 100
}
```
