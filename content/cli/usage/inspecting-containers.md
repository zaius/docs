---
tags: builds
---

## Inspecting builds

Often you want to have a closer look at what happened within your
pipelines.

Builds that you have [pulled](/cli/usage/pulling-builds.html), or
[built locally](/cli/usage/building.html) using the CLI can be inspected.

This is useful for debugging purposes and having a closer look at what
happened during your build.

As wercker currently supports [Docker containers](/docs/containers/index.html),
introspection is done via the Docker command.

> NOTE: To use this feature on local builds, you'll need to use the --commit flag to save a copy of your build.

### Using the Docker command

Assuming you have [built a container
locally](/cli/usage/building.html) or have
[pulled](/cli/usage/pulling-builds.html) a build artifact as
container you can run the following command to inspect your container:

```no-highlight
docker run -it --rm build-<BUILD-ID> /bin/bash
```

This gives you a prompt inside the container. Now you can jump into the
`pipeline` directory and have a look at the contents of your build
pipeline.

After you've run the container you can retrieve it's container-id by
running `docker ps -a`. You can then stop the container:

```no-highlight
docker stop <CONTAINER-ID>
```

Note that containers take up storage on your local machine and you want
to clean (delete) these from time to time.
