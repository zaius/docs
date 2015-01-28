## Sections

The `wercker.yml` file allows you to set up your wercker enviroment.

### Container

The box section allows you to choose a box which will be used to run the builds and deploys. This item will contain a single reference to the box. The box will be prefixed by the owner and it can be postfixed with a "@" followed by a version. If no version is given, then the latest version will be used.

```yaml
box: ruby
```

### Services

The services section allow you to specify supporting boxes, like databases or queue servers. This item should contain an array of supporting boxes. The reference will be the same as to a main box. So it will be prefixed and can contain a version.

```yaml
services:
    - mongodb
    - rabbitmq
```

This will load two services, `mongodb` and `rabbitmq`, both owned by `wercker` and both using the latest versions.

### Build

The `build` section will contain all the configuration for the build pipeline.

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

### Deploy

The `deploy` section will contain all the configuration for the pipeline.

```yaml
deploy:
    steps:
        # Execute the heroku-deploy, heroku details can be edited
        # online at http://app.wercker.com/
        #- heroku-deploy

        # Execute the s3sync deploy step, a step provided by wercker
        - s3sync:
            key_id: $AWS_ACCESS_KEY_ID
            key_secret: $AWS_SECRET_ACCESS_KEY
            bucket_url: $AWS_BUCKET_URL
            source_dir: build/
    after-steps:
        - hipchat-notify:
            token: $HIPCHAT_TOKEN
            room-id: id
            from-name: name
```

[&lsaquo; Syntax](/learn/wercker-yml/02_syntax.html "nav previous yml")
[Environment variables &rsaquo;](/learn/wercker-yml/04_environment-variables.html "nav next yml")
