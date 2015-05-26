## Building Projects Locally

Using the wercker CLI you can build projects locally on your machine.
Make sure you have a [working Docker
environment](/docs/using-the-cli/requirements.html) running.

```sh
wercker build
```

### Mouting the working directory

You can also directly mount the current working folder into the pipeline on the container.

```sh
wercker build --direct-mount
```

### Committing a build locally

When building locally Docker containers are not stored. Using the `--commit` flag
you can commit the build result as a container and run it at a later time.

```sh
wercker build --commit
```
