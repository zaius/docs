---
tags: yml
---

## The wercker.yml

The `wercker.yml` defines the configuration of your automation
[pipelines](/docs/pipelines/index.html) with a set of tasks (steps) that
you want to have executed.

The three top-level sections (or pipelines) that are supported by default are `dev` for
local development, `build` for building your applications locally and
on the wercker website, and `deploy` for lauching your application on a
cloud platform.

A pipeline can have its own base box, or
[container](/docs/containers/index.html) that is used as a starting
point. You can use different base boxes on a
[per-pipeline-basis](/docs/pipelines/per-pipeline-containers.html)

Each pipeline can specify its own services, for example, most deploy 
pipelines don't need access to a database and most development pipelines
want to use the most recent tags of specific boxes.

Each pipeline consists of [steps](/docs/steps/index.html), which can
either fail or pass.

See this [link](/docs/wercker-yml/creating-a-yml.html) for an example of a `wercker.yml` file.

