## How it works

Build pipelines are triggered when new code is committed to your source
control provider. Deploy pipelines can be triggered manually or through
[auto deployment](/docs/deploy/auto-deploy.html).

Build pipeline have an end result called an *artifact* which is the
result of your pipeline. Wercker stores this artifact on its
infrastructure such that it can be used in deploy pipelines.

When a build pipeline starts it uses the [box]()

![image](/images/pipeline-build.png)

The starting point for a deploy pipeline is the artifact that was
created during the build pipeline.

With pipelines *environment variables* can be used to for tokens,
passwords and other configuration information that might be needed
during the lifetime and execution of a pipeline.

[&lsaquo; Introduction to pipelines ](/learn/pipelines/01_introduction.html "nav previous pipelines")
[Available env vars &rsaquo;](/learn/pipelines/03_available-env-vars.html "nav next pipelines")
