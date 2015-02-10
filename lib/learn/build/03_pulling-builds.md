## Pulling builds

After you've run your builds on the wercker platform you're able to pull
these pipeline artifacts to your local machine in order to run and introspect them. To do
this, you again need a working [local docker environment](/learn/basics/03_the-wercker-cli.html).

In order to pull a build you need a `build-id` and of course the right
permissions to a project. You can pull builds with the following
command:

```sh
wercker pull <BUILD-ID>
```

Make sure you have boot2docker or a working docker environment running
as the `wercker pull` command will store this container in the docker
environment after pulling it.

[&lsaquo; Local builds](/learn/build/02_local-builds.html "nav previous build")
[Introspecting builds &rsaquo;](/learn/build/04_introspecting-builds.html "nav next build")
