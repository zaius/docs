## Authenticating with the wercker API

You authenticate to the wercker API by providing one of your `bearer` tokens in the request.

From the [OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6750) specification:

> Any party in possession of a bearer token (a "bearer") can use it to get access to the associated resources (without demonstrating possession of a cryptographic key)

You can manage and create your tokens from your account on the personal profile page under personal tokens. You can have multiple tokens active at the same time.

![image](/images/tokens.png)

Make sure to keep these tokens secret as they give access to information about your applications. You can only generate a token once, so be sure to save it somewhere. You can *regenerate* tokens but note that any application you've written that uses the old token needs to be updated with the regenerated one.

All API requests must be made over HTTPS. Requests made over plain HTTP will fail and all requests must be authenticated.

### Curl example

Below an example by using the `curl` command:

```bash
curl -H "Authorization: Bearer <TOKEN>" https://app.wercker.com/api/v3/applications/wercker/docs
```

and the response

```javascript
{
    id: "54c9168980c7075225004157",
    url: "https://app.wercker.com/api/v3/applications/wercker/docs",
    name: "docs",
    owner: {
        type: "wercker",
        name: "wercker",
        avatar: {...},
        userId: "55310d295732ce8a41000054",
        meta: {...}
    },
    builds: "https://app.wercker.com/api/v3/applications/wercker/docs/builds",
    deploys: "https://app.wercker.com/api/v3/applications/wercker/docs/deploys",
    scm: {
        type: "git",
        owner: "wercker",
        repository: "docs"
    },
    createdAt: "2015-01-28T17:04:09.851Z",
    privacy: "public",
    stack: 5
}
```

### NETRC

Note that if you've previously installed the deprecated version of the wercker command line interface (written in Python), you will probably have a .netrc file with credentials that prevents the Bearer token to be used.
