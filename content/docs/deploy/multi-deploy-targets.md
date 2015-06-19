---
tags: deployment
---

## Multi deploy targets

Currently when deploying, the steps defined in the `steps` property will be used
to deploy, see [deploys step](/docs/deploy/index.html). It is also possible to
use different steps for different deploy targets.

You need to use the same name of the deploy target instead of the `steps`
property. In the following example, deploys to deploy target `stable` and `beta`
will use different steps than deploys to other deploy targerts:

```yaml
box: nodesource/trusty
build:
  steps:
  - npm-install
  - npm-test
deploy:
  # This will be used, if no deploy target is found.
  steps:
  - script:
      name: deploy
      code: echo default deploy

  # This will be used, if the deploy target "stable" is used.
  stable:
  - script:
      name: deploy
      code: echo stable deploy

  # This will be used, if the deploy target "beta" is used.
  beta:
  - script:
      name: deploy
      code: echo beta deploy
```

If you start a deploy to certain deploy target, but the name for this deploy
target is not found, than the steps in `steps` will be used.
