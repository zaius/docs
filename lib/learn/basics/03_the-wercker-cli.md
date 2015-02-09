## The wercker CLI

Wercker offers a command line interface (CLI) that speeds up your workflow
even faster.

The CLI can be used to execute *single player mode*
[pipelines](/learn/pipelines/01_introduction.html) locally for easy
introspection and debugging. You can get the CLI for either Mac or Linux from our [downloads
page](http://wercker.com/downloads).

### Requirements

In order to make use of all of the features within the CLI you will need
a working Docker environment. On linux it is easy to install Docker
depending on your distribution and package manager. See Docker's
[installation
instructions](https://docs.docker.com/installation/#installation) fore more information.

If you are running Mac OSX you can install Docker using an installer
called [boot2docker](https://docs.docker.com/installation/mac/) that
will install [VirtualBox](https://www.virtualbox.org/) and a minimal
Docker environment. As an alternative you can use
[Vagrant](http://vagrantup.com) to install a separate boot2docker
virtual machine using [this vagrant box](https://github.com/mitchellh/boot2docker-vagrant-box).

### OSX quick start

If you're eager to get up to speed on OSX, below is a quickstart that
installs boot2docker via the [homebrew package
manager](http://brew.sh/).

```sh
brew install boot2docker

export DOCKER_HOST=tcp://192.168.59.103:2376
export DOCKER_CERT_PATH=$HOME/.boot2docker/certs/boot2docker-vm
export DOCKER_TLS_VERIFY=1

boot2docker init
boot2docker up
```

### Commands

The wercker command line interface comes with the following commands:

```bash
COMMANDS:
   build, b     build a project
   deploy, d    deploy a project
   inspect, i   inspect a recent container
   detect, de   detect the type of project
   login, l     log into wercker
   pull, p      pull a build result
   version, v   display version information
   help, h      Shows a list of commands or help for one command
```

The *detect* command introspects your projects and generates
[wercker.yml](/learn/wercker-yml/01_introduction.html) files for your
projects.

> Currently go, python, nodejs and ruby are support in the detect
> command

The *build* and *deploy* commands execute these pipelines locally. Using
the *pull* command you can download a container from the wercker
platform and use *inspect* to debug this container locally.

- - -
> Want to learn more? Read more about this on the
> [docs](/docs/cli/commands.html)

[&lsaquo; Signing up](/learn/basics/03_signing-up.html "nav previous basics")
[Using the web interface &rsaquo;](/learn/basics/04_using-the-web-interface.html "nav next basics")
