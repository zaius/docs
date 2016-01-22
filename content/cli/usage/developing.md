## Local Development with the CLI

You can use the wercker CLI during local development of your
applications and microservices.

Similar to the wercker web platform, the
wercker cli will spin up services in containers alongside the code you
are writing. This not only increases
development/production parity but also allows you to test experimental
changes _before_ you commit them.

### wercker dev

The `wercker dev` command executes the `dev` pipeline designed for live
development. Whereas the wercker [build command](/cli/usage/building.html) a
copy of your code is built inside a container in order to mitigate side
effects, the `dev` command directly mounts your local directory inside the
container.

### internal/watch

During local development you often times want to reload your environment on
code changes. The `internal/watch` step is a long-running step that does
exactly that and goes hand in hand with the `wercker dev` command.

In order to use `wercker dev` and `internal/watch` you create a `dev` section
in your [wercker.yml](/docs/wercker-yml/index.html) file:

```yaml
box: nodesource/trusty
dev:
  steps:
    - npm-install
    - internal/watch:
        code: node app.js
        reload: true
```

In this example we set up a `dev` pipeline in which one initial step,
`npm-install` is run to prepare the container's environment and install
the necessary dependencies.

Next, we use the `internal/watch` step to
launch the application and through `reload: true` we reload the
environment on file changes.

We run the development pipeline as follows:

```no-highlight
wercker dev --publish 5000
```

We expose the port on which the application is listening such that we
can see it action by browsing to your Docker host). If you are using
[boot2docker](http://boot2docker.io) the IP is usually `192.168.59.103`
but we tell you the IP address of the host once the step is run.

### internal/shell

Often times you want to inspect the state of a container between steps
or tweak services running inside a container. The `internal/shell` step
drops you into a shell of the running container and enables to you to
look around and tweak things.

As with the `internal/watch` step,
`internal/shell` goes hand in hand with the `dev pipeline`.

The example below showcases the `internal/shell` step when checking log
entries:

```yaml
box: nodesource/trusty
dev:
  - npm-install
  - internal/shell:
      cmd: /bin/sh  #defaults to /bin/bash
      code: |
        # some code to automatically run in your shell session
        # before you start interacting
        cd /var/log
```

### Flags
To see which flags can be used to configure your development environment, please
see [options and flags](/cli/configuration/options-and-flags.html).

