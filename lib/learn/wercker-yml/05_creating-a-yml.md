## Creating a yaml

### Full working example

If you're eager to grasp the `wercker.yml` format, below an example file that includes all elements which are discussed below.

```yaml
box: wercker/ruby
services:
    - mies/rethinkdb
build:
    steps:
        # Execute the bundle install step, a step provided by wercker
        - bundle-install
        # Execute a custom script step.
        - script:
            name: middleman build
            code: bundle exec middleman build --verbose
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

[&lsaquo; Environtment variables](/learn/wercker-yml/04_environment-variables.html "nav previous yml")
[Containers &rsaquo;](/learn/containers/01_introduction.html "nav next containers")
