## Pipelines

The pipeline is the heart and soul of wercker, it's where you define the
[steps](/docs/steps/index.html) and [environment](/docs/the-environment/index.html) 
for your tasks, often your tests, builds and deploys. These are top level elements in your
[wercker.yml](/docs/wercker-yml/index.html). They are an aggregate of steps and will
pass or fail based on the steps within.

Each pipeline also comes with an environment, some set by default by the
wercker tool and, when run by wercker.com, others defined by the settings
you've entered on wercker.com.

When defining your pipeline, you've got a few knobs to work with:

  - The pipeline name (the name of the section in the wercker.yml), the
    special supported ones are `build`, `deploy`, and `dev`, the latter
    for when [developing locally](/docs/using-the-cli/local-development.html).
  - Each pipeline can specify its own base box, for example, in many case a
    deploy (or deployable container) does not have the same dependencies as
    the build or dev environment and smaller containers move around the
    internet faster.
  - Each pipeline can specify its own
      [services](/docs/services/index.html), for example, most deploy
    pipelines don't need access to a database and most development pipelines
    want to use the most recent tags of specific boxes.
  - Currently, deploy pipelines can specify their steps in sections named after
    different deploy targets (instead of "steps"), this will be deprecated
    once multiple deploy pipelines are supported, but for now makes it easy to
    support different environments like "staging" and "production"

And, of course, pipelines are made of [steps](/docs/steps/index.html) 
and [after-steps](/docs/steps/after-steps.html).
