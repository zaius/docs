---
tags: builds
---

## Pulling builds

You can use the [wercker command line interface](/docs/using-the-cli/commands.html) to pull build
artifacts, which are containers themselves, to your local machine.

You can also pull a specific build using the build-id as identfier:

```bash
wercker pull <BUILD-ID>
```

This will download the container as a `tarball`. If you have a working Docker environment and you want to directly load the container
after download, than use the `--load` flag.

If you've already downloaded a `tarball`, you will get an error message that the `repository.tar` already exists. You must
either delete the file, or use the `-f` flag and rerun the `wercker pull` command.

You can also query for a certain build. For this, you need the *name*
of the owner and *project-name* on wercker. Then you can optionally give some
extra queries such as *branch* or result.

```sh
wercker pull owner/project-name [query flags]
```

Checkout the all available flags in the help page:

```sh
wercker pull --help
```

Make sure you have a working
[Docker environment](/docs/using-the-cli/requirements.html)
when pulling your builds.
