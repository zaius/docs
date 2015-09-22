---
tags: docker
---

## Entrypoints

The `entrypoint` is a feature in Docker which enables it to specify the
executable to be run. This article briefly explains what the entrypoint is, and
what you need to know when using containers that override the entrypoint when
using them with wercker.

By default, the entrypoint for every image is empty. This will make Docker use
a default. When using this default, everything that is specified as the `cmd`
will be executed as is. It is possible to override the entrypoint for an image,
either during creation of a Docker image, or during runtime from the cli or
remote API.

If the entrypoint is overridden, the content of `cmd` will be added to
entrypoint. This makes it possible to specify a default entrypoint, and use the
`cmd` to pass in any optional arguments.

A small example: take a container that was created with an entrypoint `s3cmd`
and a cmd `--help`. Running this container with no parameters:
`docker run s3cmd` will result in the following execution: `s3cmd --help`. If
you do provide a `cmd` override like this: `docker run s3cmd ls s3://bucket`,
then it will execute the following: `s3cmd ls s3://bucket`.

More information about entrypoints:

- https://docs.docker.com/reference/builder/#entrypoint
- https://docs.docker.com/reference/run/#entrypoint-default-command-to-execute-at-runtime

## Entrypoint and wercker

If you are using a container that overrides its entrypoint, then you need to
keep the following in mind:

Wercker uses a shell to execute the steps. By default, we will leave the
`entrypoint` alone, and set the `cmd` to `/bin/bash`. This means that the
`entrypoint` should have an exectable that accepts `/bin/bash`. If this is not
possible, then you need to override the `entrypoint` in the wercker.yml:

```yaml
box:
  id: ubuntu
  entrypoint: /bin/bash -c
```

Effectively, this will execute: `/bin/bash -c /bin/bash`. Overriding either
`entrypoint` or `cmd` works, and so does a combination of both. Just make
sure that wercker gets a shell to run in.

When using boxes as service boxes, then you probably do not need to overide the
`entrypoint`, as we do not require a shell. However, it is possible to override
the entrypoint in the same way as you would override a main box.
