---
tags: target, deployment, environment variables
---

## Deploy

A deploy is a [pipeline](/docs/pipelines/index.html) and similar to build can
have its own set of [steps](/docs/deploy/steps.html). The major differences
between a build and a deploy are:

* deploy uses the output of a (green) build.
* requires a deploy target
* deploys are triggered manually via the interface (or via [auto-deploy](/docs/deploy/auto-deploy.html))

### Targets

Targets can represent servers (for instance staging/production) as well as
platforms (docker hub, npm registry). A target has 3 destinctive configuration
options:

1. name
2. environment variables
3. [auto-deploy](/docs/deploy/auto-deploy.html) options

#### Environment variables

Assuming staging/production parity, a single series of steps can be used to
deploy an application. The things that are often different are SSH-keys,
API-tokens. The deploy targets can hold these unique values.
