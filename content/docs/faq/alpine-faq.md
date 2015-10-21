---
tags: docker, alpine
---

## Alpine faq

This faq contains multiple questions related to using Alpine on wercker. Most
issues are caused by the minimal nature of the images, this is why most issues
are also applicable to other minimal containers, such as busy box.

- [I receive a "context canceled" error when using an Alpine container](#i-receive-a-context-canceled-error-when-using-an-alpine-container)
- [I receive the "Unable to sync environment" when using docker-push on Alpine](#i-receive-the-unable-to-sync-environment-when-using-docker-push-on-alpine)

<a name="context-canceled"></a>
### I receive a "context canceled" error when using an Alpine container

This error occurs during the `setup environment` step, and is caused by the
fact that we use `/bin/bash` to run the steps. Alpine doesn't contain the bash
shell, so it fails. 

Wercker doesn't require `bash`, is is also possible to use `sh`. You're able
to override the cmd that wercker uses by specifying the `cmd` property in the
box section:

```yaml
box:
    id: alpine
    cmd: /bin/sh
```

<a name="unable-to-sync"></a>
### I receive the "Unable to sync environment" when using docker-push on Alpine

After receiving this warning the container stops. Before running the docker
deploy step, we first synchronize the environment variables from within the
container to the wercker exectable. We do this by invoking `env --null` inside
the container and parsing the output. Alpine does not support the `--null`
flag, and so it crashes. 

To prevent this error from happening, you can add the `disable-sync` flag:

```yaml
box:
    id: alpine
    cmd: /bin/sh
deploy:
    steps:
        - internal/docker-push:
            disable-sync: true
```

This does mean that you're unable to use any environment variables defined
within the container. Any environment variables defined at the start of
execution, or on the wercker web will work.
