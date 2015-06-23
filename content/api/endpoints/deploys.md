## Deploys

* [Get a deploy](#get-a-deploy)

### <a name="get-a-deploy" class="anchor"></a>Get a deploy

Get the details of a single deploy.

***
`GET /api/v3/deploys/:deploy`
***

#### Response

```
Status: 200 OK
```

```json
{
  "build": {
    "status": "finished",
    "startedAt": "2015-04-24T14:15:36.967Z",
    "id": "553a50021f74af18460a6719",
    "url": "https://app.wercker.com/api/v3/builds/553a50021f74af18460a6719",
    "branch": "api_docs",
    "createdAt": "2015-04-24T14:15:30.593Z",
    "finishedAt": "2015-04-24T14:18:22.784Z",
    "message": "api to API",
    "progress": 100,
    "result": "passed"
  },
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
  "progress": 100,
  "createdAt": "2015-04-24T15:50:11.815Z",
  "result": "passed",
  "status": "finished",
  "url": "https://app.wercker.com/api/v3/deploys/553a663345c9abc823002085",
  "id": "553a663345c9abc823002085"
}
```
