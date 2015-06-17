---
tags: heroku
---

## Heroku

This article explains how to deploy an application with wercker to
[Heroku](https://heroku.com). For this tutorial you need both a Heroku
account and an account on wercker. The application developed in this
tutorial is a simple [nodejs](/docs/languages/nodejs.html) web
application but most of the patterns apply to other programming
languages as well.

### Requirements

* a Heroku account
* an account on wercker
* the wercker command line interface which you can download
    [here](http://wercker.com/downloads/)

### Setting up the application

A sample application is already available on
[GitHub](https://github.com/wercker/wercker-nodejs-heroku) which you can
clone or fork.

```sh
git clone https://github.com/wercker/wercker-nodejs-heroku.git
```

If you clone the repository, make sure to create an new repo on GitHub.
If you fork the project, adjust the clone URL to your username on
GitHub.

This web application runs on port `5000` and returns `Hello World` on
request the root route (`/`).

### Creating the wercker.yml file

We are now ready to create the
[wercker.yml](/docs/wercker-yml/index.html) file which contains our
pipeline definitions for developing, building and deploying
applications. Although the repository already contains a `wercker.yml`
file it's a good exercise to go through the process and get familiar
with the format and syntax!

We could create one from scratch manually but the `wercker` command can
detect most common programming languages and generate sensible defaults.

In the root of the folder containing the source files run the following
command:

```sh
❯ wercker detect
########### Detecting your project! #############
Detected: nodejs
Generating wercker.yml
```

You can now open the `wercker.yml` file and it should display the
following contents (we've stripped out most of the comments for the
purpose of clarity).

```yaml
# This references the default nodejs container from
# the Docker Hub: https://registry.hub.docker.com/_/node/
# Read more about containers on our dev center
# http://devcenter.wercker.com/docs/containers/index.html
box: node
# This is the build pipeline. Pipelines are the core of wercker
# Read more about pipelines on our dev center
# http://devcenter.wercker.com/docs/pipelines/index.html

build:
  # The steps that will be executed on build
  # Steps make up the actions in your pipeline
  # Read more about steps on our dev center:
  # http://devcenter.wercker.com/docs/steps/index.html
  steps:
    # A step that executes `npm install` command
    - npm-install
    # A step that executes `npm test` command
    - npm-test

    # A custom script step, name value is used in the UI
    # and the code value contains the command that get executed
    - script:
        name: echo nodejs information
        code: |
          echo "node version $(node -v) running"
          echo "npm version $(npm -v) running"

```

From the `wercker.yml` you can see that we're using a default Docker
container from the [Docker Hub](https://hub.docker.com/) to run our build pipeline in. Within
the build pipeline we're executing some simple steps: installing our
dependencies, running tests (which we don't have!) and echo'ing some
information on the `node` and `npm` versions. You can read more about
steps in [this section](/docs/steps/index.html).

### Adding our project to wercker

Add and commit your `wercker.yml` file to your git repository:

```sh
git add wercker.yml
git commit -m 'added wercker.yml'
```

Now push it to GitHub:

```sh
git push origin master
```

Let's add this project to wercker. Log into wercker and click the
create button and add a new application. You will be guided through the
_add application wizard_ and it will detect that you already have a
`wercker.yml` present in your repository.

### Deploying to Heroku

We are now ready to start deploying to heroku.
