---
tags: builds
---

## Pulling builds

You can use the [wercker command line interface](/docs/using-the-cli/commands.html) to pull build
artifacts, which are containers themselves, to your local machine.

There are two ways for pulling builds:

* by application (allowing you to get the latest build filtered by branch and/or result)
* by build id.

Here are some examples of pulling build by application:

```bash
wercker pull <NAME>/<APPLICATION> --branch <BRANCH> --load
```

Or the last passed build:

```bash
wercker pull <NAME>/<APPLICATION> --branch <BRANCH> --result passed --load
```

Pulling using a build id is the shortest:

```bash
wercker pull <BUILD-ID> --load
```

The `--load` option is not required, but will automatically load the container after the download.
A working docker environment is required for this option.

The result of a wercker pull command looks something like:

```
Fetching build information for application wercker/docs
Downloading Docker repository for build 558d2ecdff40819f0620ea15
Downloading: 100%
Download complete
Importing into Docker
Finished importing into Docker
```

The image should be visible when you run `docker images`:
```
REPOSITORY                       TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
build-558d2ecdff40819f0620ea15   master              4eba85fb37af        37 minutes ago      611.2 MB
```

The repository for the container is named build-<id> and is tagged with the branch name (the build id is shown during the wercker pull).

You can now inspect the contents of the container by running:
```
docker run -i -t build-558d2ecdff40819f0620ea15:master /bin/bash
```

### How pull works
Running this command will download the container as a `tarball`. After download it can load the container
into your docker environment.

If you've already downloaded a `tarball`, you will get an error message that the `repository.tar` already exists. You must
either delete the file, or use the `-f` flag and rerun the `wercker pull` command.

Checkout the all available flags in the help page:

```sh
wercker pull --help
```

Make sure you have a working
[Docker environment](/docs/using-the-cli/requirements.html)
when pulling your builds.
