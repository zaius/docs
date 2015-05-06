## Authenticating with the wercker API

For some endpoints you do not need to authenticate. For example, you're able to
get the details from a public project without authenticating. Most endpoints
however do require authentication.

Currently wercker doesn't support a full OAuth 2.0 implementation. But you can
create and manage your tokens for your account on the personal profile page
under personal tokens. You can have multiple tokens active at the same time.

![image](/images/tokens.png)

Make sure to keep these tokens secret as they are equivalent of your username
and password. We will store a hashed version of the token, while sending the
token to you. So make sure you store the token right after creating it, as
you're not able to retrieve it again.

### Using a token

The recommended way to use a token is to use the `Authorization` header. This is
the header format that is used:

```
Authorization: Bearer <TOKEN>
```

It is also possible to add the token as a querystring parameter. This however is
not recommended, and should only be used if it is impossible to use the header
method. You should use the `token` querystring key, and the value should be the
token.

### Curl example

Below an example by using the `curl` command:

```
curl -H 'Authorization: Bearer <TOKEN>' https://app.wercker.com/api/v3/applications/wercker/docs
```

See [clients](clients.html) for other client and more examples.

### .netrc

Note that if you've previously installed the deprecated version of the wercker
command line interface (written in Python), you will probably have a ~/.netrc
file with credentials that prevents the Bearer token to be used. You should
remove this file (or just the section related to `app.wercker.com`).
