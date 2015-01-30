## How it works

The workflow that wercker offers is roughly depicted below.

Each time you do a `git push` wercker gets a signal via the source control platform that hosts your code that new code has been comitted. Wercker subsequently fetches this code, builds it and runs your unit tests or other [build](/articles/introduction/builds.html) steps (javascript minimization, compass compilation).

![image](/images/how-it-works.png)

Once these steps have been completed your `build` has either passed or failed. If all went well you are ready to deploy your application to platforms such as Heroku, Amazon Web Services or other deploy target. Similar to the build phase, the deployment part of the wercker [pipeline](/articles/introduction/pipeline.html) consists of [deploy steps](/articles/introduction/deploys.html).

Continuously repeating these steps allows you and your team to work in small increments which are easier to debug and thus you are also delivering value to your own customers at a rapid pace.

[&lsaquo; Introduction](/learn/basics/01_introduction.html "nav previous basics")
[Signing up &rsaquo;](/learn/basics/03_signing-up.html "nav next basics")
