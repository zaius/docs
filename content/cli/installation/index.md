## Installation

This section will outline the steps needed to install the wercker CLI.

### Requirements

In order to make use of all the features within the CLI you will need a working
Docker environment. You can install Docker and Docker-machine using [Docker
Toolbox](https://www.docker.com/docker-toolbox).

### Setting up

After installing docker & docker-machine, you'll need to create a new Virtual
Machine that will run docker:

`docker-machine create --driver virtualbox dev`

Then, once you've created your VM, you will need to export some variables to
your environment:

`eval "$(docker-machine env dev)"`

Note that you will need to do this every time you start a new shell. Add this
line to your .profile to circumvent this.

### Installing the CLI

Now that your environment is set up, you can install wercker using
[brew](http://brew.sh)!

```no-hightlight
brew tap wercker/wercker
brew install wercker-cli
```

Don't have brew? You can install the CLI manually:

```no-highlight
curl -L https://s3.amazonaws.com/downloads.wercker.com/cli/stable/darwin_amd64/wercker -o /usr/local/bin/wercker
```

### Getting started

Now that you've succesfully installed brew, you can get started with one of our
[quickstarts](http://devcenter.wercker.com/quickstarts/index.html).
