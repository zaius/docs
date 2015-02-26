## Sections

As mentioned in the introduction, the `wercker.yml` has different
sections that each have a specific purpose. We will go over each
individual section in this part.

### Container

The box section allows you to choose a
[container](/learn/containers/01_introduction.html) which will be used
to run the builds and deploys. This item will contain a single reference
to the box. The box will be prefixed by the owner and it can be
postfixed with a `":"` followed by a version or tag. If no version is given, then
the latest version will be used. If no user is specified, default
containers from the [Docker Hub](/learn/containers/02_docker-hub.html) will be used.

```yaml
box: ruby
```

### Services

The services section allow you to specify supporting boxes, like databases or queue servers. This item should contain an array of supporting boxes. The reference will be the same as to a main box. So it will be prefixed and can contain a version.

```yaml
services:
    - mongodb
    - redis
```

This will load two services, `mongodb` and `redis`, both default Docker
containers from the Hub and both using the latest versions.

### Build

The `build` section will contain all the configuration information for the build
[pipeline](/learn/pipelines/01_introduction.html).

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

Two types of [steps](/learn/steps/01_introduction.html) are defined in this build section. First a
`bundle-install` step that installs the Rubygem dependencies. This step
is availble from the [step marketplace](/learn/steps/06_step-registry.html). The second step in an inline
script that in this case compiles our static site.

### Deploy

The `deploy` section will contain all the configuration information for the deploy
[pipeline](/learn/pipelines/01_introduction.html).

```yaml
deploy:
    steps:
        # Execute the s3sync deploy step, a step provided by wercker
        - s3sync:
            key_id: $AWS_ACCESS_KEY_ID
            key_secret: $AWS_SECRET_ACCESS_KEY
            bucket_url: $AWS_BUCKET_URL
            source_dir: build/
    # notify slack on succesful or failed deploys
    after-steps:
        - kobim/slack-post:
            url: $SLACK_URL
            channel: notifications
            username: werckerbot
```

Here we see the Amazon Web Services S3 synchronization step that can
sync static assets to S3. Environment variables are used that hold the
correct credentials. The values of these environment variables are
specified through the wercker web interface.

Next, we have an [after-step](/learn/steps/03_after-steps.html) that notifies a Slack chat room of either
passed or failed deploys in a [Slack](http://slack.com) chat room. The `$SLACK_URL` environment variables holds
the webhook url it should post the notification to.

We've covered a lot of ground on this page but fortunately there are
dedicated sections for topics such as [pipelines](/learn/pipelines/01_introduction.html), [containers](/learn/containers/01_introduction.html) and
[steps](/learn/steps/01_introduction.html).

[&lsaquo; Introduction](/learn/wercker-yml/01_introduction.html "nav previous yml")
[Environment variables &rsaquo;](/learn/wercker-yml/03_environment-variables.html "nav next yml")
