## Available pipelines

Pipelines are a core concept of wercker. They take code as input, execute a
series of steps, and produce a container. 

The steps used change according to the type of pipeline. Right now, wercker
distinguishes between three pipelines: dev, build and deploy.

### Dev

The goal of the development pipeline is to allow you to develop your
application locally inside of containers, while wercker takes care of
automating your development environment. You can specify services, that will
run inside containers, which you need to run your app. Services can be
Databases, Messaging queues, or even your own specific API that you have hosted
on Dockerhub (you can read more about containers in the “containers” section).

Developing inside containers (and letting wercker automate that process) is
extremely useful because it allows you to execute your applications as they
would run inside production (in a container!). That means that you get real
close to dev/prod parity. 

The dev pipeline is unique and in contrary to the build and deploy pipeline,
can only be used while using the wercker CLI, and not on the hosted wercker
platform.


In order to use the the development pipeline, incorporate the following in your
`wercker.yml` file.

```yaml
dev:
  steps:
    - npm-install
    - internal/watch:
        code: node app.js
        reload: true
```

- - -
> Want to learn more? Read more about this on the
> [docs](/docs/using-the-cli/local-development.html)

### Build

The goal of the build pipeline is to get your application ready for deployment.
This could mean compiling your app, running tests, linting and running
integration tests with other services. While the build pipeline also produces a
container, it’s useful to extract just the components, or artefacts, that you
need for your the actual deployment of your application. 

```yaml
build:
    steps:
        # Execute the bundle install step, a step provided by wercker
        - bundle-install
        # Execute a custom script step.
        - script:
            name: middleman build
            code: bundle exec middleman build --verbose
```

Two types of [steps](/learn/steps/introduction.html) are defined in this
build section. First a `bundle-install` step that installs the Rubygem
dependencies. This step is available from the
[step registry](/learn/steps/step-registry.html). The second step in an inline
script that in this case compiles our static site.

### Deploy

Running a deploy happens in a fresh container and basically works the same as a
build pipeline. However, a deploy pipeline has access to the results of a build
pipeline, so that it can copy the needed artefacts produces by the build into
this new deploy container. This container can then contain additional steps to
either push the container as-is to a registry (e.g. Docker Hub) and / or
execute an API call to a scheduler (such as Kubernetes or Mesosphere) to notify
that there is a new version of a container image ready to be scheduled.

```yaml
deploy:
    steps:
        # Execute the s3sync deploy step, a step provided by wercker
        - s3sync:
            key_id: $AWS_ACCESS_KEY_ID
            key_secret: $AWS_SECRET_ACCESS_KEY
            bucket_url: $AWS_BUCKET_URL
            source_dir: build/
```

Here we see the Amazon Web Services S3 synchronization step that can
sync static assets to S3. Environment variables are used that hold the
correct credentials. The values of these environment variables are
specified through the [wercker web interface](/learn/pipelines/using-env-vars.html).

We've covered a lot of ground on this page but fortunately there are
dedicated sections for topics such as [pipelines](/learn/pipelines/introduction.html), [containers](/learn/containers/introduction.html) and
[steps](/learn/steps/introduction.html).

[&lsaquo; How it Works](/learn/pipelines/how-it-works.html "nav previous pipelines")
[Steps &rsaquo;](/learn/steps/introduction.html "nav next steps")
