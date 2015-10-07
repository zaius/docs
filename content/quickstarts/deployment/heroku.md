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

```no-highlight
git clone https://github.com/wercker/wercker-nodejs-heroku.git
```

If you clone the repository, make sure to create an new repo on GitHub.
If you fork the project, adjust the clone URL to your username on
GitHub. This repository already contains several files that we will
create during this tutorial, so feel free to overwrite them during your
progress.

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

```no-highlight
$ wercker detect
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

### Adding your project to wercker

Add and commit your `wercker.yml` file to your git repository:

```no-highlight
git add wercker.yml
git commit -m 'added wercker.yml'
```

Now push it to GitHub:

```no-highlight
git push origin master
```

Let's add this project to wercker. Log into wercker and click the
create button and add a new application. You will be guided through the
_add application wizard_ and it will detect that you already have a
`wercker.yml` present in your repository. See the [how to add an application section](/docs/web-interface/adding-a-new-application.html)
for more information on how to do this.

### Adding a deploy pipeline

We are now ready to start deploying to Heroku. First, let's add a
`Procfile` which Heroku expects to be present. It defines which process
to start for your application. Create this file with the following
contents and add it to your repository.

```no-highlight
web: node app.js
```

If you haven't already
done so, now would be a good time to run `heroku create` to create an
app on Heroku. Take note of the application name you receive back.

Next, we are going to add a deploy pipeline to our `wercker.yml` file.
Create a new top level section called `deploy:` in your `wercker.yml` as
follows:

```yaml
deploy:
  steps:
    - heroku-deploy:
        key: $HEROKU_KEY
        user: $HEROKU_USER
        app-name: $HEROKU_APP_NAME
```

Let's go over this section. First, we create our deploy pipeline and its
`steps` section. We add just one step to the section called `heroku-deploy` which
is available from the wercker [registry](https://app.wercker.com/#explore). This steps has three
required parameters; `key` which is your Heroku API key that can
retrieve from your account settings on Heroku. The next is `user` which
is your username on Heroku and finally `app-name` which is the name of
your application that you got when running `heroku create`. The
application name is the classic Heroku _haiku_ type application name.

All of the parameters for the Heroku deploy step are filled with
environment variables as you shouldn't hard code any of this
information. We will now add these environment variables to the wercker
web interface.

### Creating a deploy target

First, we'll create a deploy target as wercker needs to know *where* to
deploy *to*. Navigate to your application on wercker and go to the
settings tab.

In the `deploy targets` section, add a custom deploy target called
*heroku*. Next, we're going to add all the environment variables that we
need.

![image](/images/heroku_01.jpg)

First, add your username as the `HEROKU_USER` environment variable.

![image](/images/heroku_02.jpg)

Next, we will add the Heroku API key that you got from your account page
on Heroku as a _protected_ environment variable called `HEROKU_KEY` as we want it to remain
secret. Protected environment variables are hidden from logs and can't
be retrieved after creation.

![image](/images/heroku_03.jpg)

Finally, we add another plain text environment variable for the
`HEROKU_APP_NAME` variable.

![image](/images/heroku_04.jpg)

Now, we're all set to deploy!

### Triggering a deploy

Let's commit and check in our final changes to the `wercker.yml` file.

```no-highlight
git commit -am 'added deploy section to wercker.yml'
```

Now when we do a `git push origin master` this will trigger a build on
wercker that should pass.

![image](/images/heroku_05.jpg)

We can take this build and now deploy it to Heroku!
for more information on how to do this.

![image](/images/heroku_06.jpg)

The deploy should pass and you can visit your application at the
designated url for your app!

### Using SSH Keys

One thing you should've noticed is that you will receive an email from
Heroku that an SSH key has been added to your account. This can get
pretty annoying so let's remedy it.

Instead of using the API key we are going to generate an SSH key on
wercker. We leave the `HEROKU_KEY` environment variable in place just in
case as it
is needed if we want to do anything with the `heroku toolbelt`.
Then in the *SSH Keys* section generate a new key pair,
for instance with the name `heroku_key_pair`. Copy that key to your
clipboard and add it as a new key on your Heroku account page in the SSH
keys section.

![image](/images/heroku_07.jpg)

Next go back to the environment variables for your deploy target and
create a new environment variable. Instead of picking *text* field as option, now pick the *SSH Key pair*
option and select the key you just generated. Assign the name
`HEROKU_KEY_PAIR` to the environment variable.

Update your `wercker.yml` as follows:

```yaml
deploy:
  steps:
    - heroku-deploy:
        key: $HEROKU_KEY
        key-name: HEROKU_KEY_PAIR
        user: $HEROKU_USER
        app-name: $HEROKU_APP_NAME
```

Note: You should not prefix the `key-name` property with a dollar 
sign (`$`) or post-fix it with `_PRIVATE` or `_PUBLIC`.

![image](/images/heroku_08.jpg)

And your all done! Now when deploying via wercker, you no longer receive
an email that a new SSH key was added!
