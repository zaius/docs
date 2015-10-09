## Internal steps
Internal steps are developed by wercker and are baked into the wercker cli as
these interact with the Docker API that is external from the container. From a 
technical perspective, it is not possible to interact with the Docker daemon from 
within a container. As such we have created these internal steps.

This article will explain all the different internal steps that are available:

* [internal/docker-push](#docker-push)
* [internal/docker-scratch-push](#scratch-push)
* [internal/watch](#internal-watch)
* [internal/shell](#internal-shell)

### <a name="docker-push"></a>internal/docker-push
This step will take your **current** pipeline image (specified either globally or per pipeline) in it's current state and push that as an image to a Docker registry. That includes the result of all the wercker steps that have been run up until that point.

```yaml
deploy:
  steps:
    - internal/docker-push:
        username: $USERNAME
        password: $PASSWORD
        tag: my-amazing-tag
        repository: turing/bar
        ports: "5000, 8080"
        registry: https://registry.hub.docker.com
```

The `$USERNAME` and `$PASSWORD` fields are environment variables that you
should specify through the [wercker web
interface](/docs/environment-variables/index.html). The `repo` field contains
the repository that you want to push to (in this case the username `turing`
with the `bar` image), and `registry` is the URL of your Docker registry. The
ports property contain the ports that you want to expose in the final
container. It is a comma separated list, and can contain `/tcp` or `/udp`
(uses `/tcp` by default).

More information about the internal/docker-push step can be found
[here](/docs/containers/pushing-containers.html).

### <a name="scratch-push" class="anchor"></a>internal/docker-scratch-push
The `docker-scratch-push` step works the same as the normal `docker-push` step.
The main difference is that this step uses a
[scratch](https://docs.docker.com/articles/baseimages/) base image provided by
Docker. This image contains only the bare essentials, and as such is very
lightweight in terms of size. To set it up correctly however, it requires some
additional steps.

It injects the files present in the `$WERCKER_ROOT` environment variable into
the root of the container.

To help you build your first scratch-enabled application, you can follow our
[tutorial](/quickstarts/advanced/building-minimal-containers-with-go.html)

### <a name="internal-watch" clacc="anchor"></a>internal/watch
The `internal/watch` step gives you a long-running step that can be configured
to reload on file changes. A very common use case for this step is front-end
development, here's an example from our getting-started-nodejs project:

```yaml
box: nodesource/trusty
dev:
  steps:
    - npm-install
    - internal/watch:
        code: node app.js
        reload: true
```

With this dev pipeline we run one initial setup step, `npm-install`, to prepare
our container's environment, then we execute our node app, reloading on changes.

To run this, you would do:

```no-highlight
wercker dev --publish 5000
```

And once it loads, browse to your docker host (either localhost on linux, or
with boot2docker usually  on 192.168.59.103) on port 5000 to see your app running.
For your convenience, we'll tell you the IP once the step runs.

As you make changes to your code, the app will be reloaded, but the npm-install
steps will not be run again.

Without the "reload: true" the code will only be run once, which is useful if
your development server has its own reloading semantics (or is only loading
static files).

### <a name="internal-shell" class="anchor"></a>internal/shell
The `internal/shell` step is pretty simple: it drops you into a shell as soon
as the step is run.

You can use it much the same way as `internal/watch`. If you want to run a
service, but be able to mess with different flags for testing, just CTRL-C the
service and restart it however you want.

You can also use it as a way to inspect the state of the system between steps,
drop into a shell, and look around.

Here's a use case where you're checking some log entries:

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

