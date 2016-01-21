## How it works

*Build pipelines* are triggered when new code is committed to your source
control provider. *Deploy pipelines* can be triggered manually or through
[auto deployment](/docs/deploy/auto-deploy.html).

Build pipelines have an end result called an *artifact* which is the
result of your pipeline. Wercker stores this artifact on its
infrastructure such that it can be used in deploy pipelines. The
artifact is stored both as a *container* and a *tarball* of just the source
files.

![image](/images/pipeline-build.png)

When a build pipeline starts it uses the *box* section in your
[wercker.yml](/learn/wercker-yml/introduction.html) file as a base container and pulls it in from the
[Docker Hub](/learn/containers/docker-hub.html), after which the
[steps](/learn/steps/introduction.html) as defined in your `wercker.yml` are executed.

Any [service](/learn/wercker-yml/sections.html#services)
container that was specified as well will be spun up as a *separate
container* and available during the build pipeline. Communication with
service containers is done through [environment variables](/learn/containers/using-containers.html).

![image](/images/pipeline-service.png)

The starting point for a *deploy pipeline* is the artifact that was
created during the build pipeline.

Within pipelines [environment variables](/learn/pipelines/using-env-vars.html)
can be used to for tokens, passwords and other configuration information that
might be needed during the lifetime and execution of a pipeline.

- - -
> You can also specify containers on a per-pipeline-basis. Read more on the docs
> [docs](/docs/pipelines/per-pipeline-containers.html)

[&lsaquo; Introduction to pipelines ](/learn/pipelines/introduction.html "nav previous pipelines")
[Available Pipelines &rsaquo;](/learn/pipelines/available-pipelines.html "nav next pipelines")
