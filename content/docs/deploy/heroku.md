---
tags: heroku
---

## Heroku

Deployment to Heroku is done through the [heroku-deploy step](https://app.wercker.com/#applications/51c829e73179be4478002157/tab/details). Three
parameters are required when using this step; `key` for your API or SSH
key, `user` which is your Heroku username and `app-name` for the name of
your application on Heroku.

In order to use this step with our Docker stack you need to add a custom
deploy target for your application on wercker and define three
environment variables for the parameters above. On the classic stack you
can set up a deploy target specifically for Heroku.

Below a deploy pipeline that you would define for the Heroku deploy step
in your [wercker.yml](/docs/wercker-yml/index.html).

```yaml
deploy:
  steps:
    - heroku-deploy:
        key: $HEROKU_KEY
        user: $HEROKU_USER
        app-name: $HEROKU_APP_NAME
```

For a quickstart on deploying to Heroku, see [this
article](/docs/quickstarts/deployment/heroku.html). You can also check
out a sample application that uses this step on
[GitHub](https://github.com/wercker/wercker-nodejs-heroku)

The source code for the heroku-deploy step is available on
[GitHub](https://github.com/wercker/step-heroku-deploy)
