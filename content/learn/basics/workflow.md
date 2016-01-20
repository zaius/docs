## Workflow

Wercker consists of two primary interfaces: the web interface and the CLI, that
tightly are tightly integrated.

### Web interface

This is the interface where you view the status of your builds and deploys
together with the rest of your team. It's also the place where you can trigger builds and
deploys. If a build goes wrong, you can check out why it went wrong here.
Furthermore you can set any environment variables that are needed for your
pipelines to execute correctly and invite other people to collaborate on your
project. 

Preferably you won’t spend too much time here, because if you setup everything
correctly all your builds and deploys will be triggered automatically and you
won’t have to look back.

### CLI

The CLI allows you to run builds locally as well as automate your
development environment, all from a single configuration file.

#### Running builds

Running your builds locally means that you can check if a build will pass or
fail before you push your code. This is useful when you want to know whether
the latest changes will potentially break your build, without dilluting
your build log with fake commits (e.g.: "test to see if build passes").

This is done by running the `wercker build` command, once you [installed the
CLI](http://wercker.com/cli/install).

#### Developing locally

More importantly, the CLI allows you to automate your development environment
by spinning up containers, moving your code inside and linking all the required
dependencies as containers as well. This allows you to develop your code in
containers

You can read more about using the wercker CLI [here](http://wercker.com/cli).

[&lsaquo; Introduction](/learn/basics/introduction.html "nav previous basics")
[Configuration &rsaquo;](/learn/basics/configuration.html "nav next basics")
