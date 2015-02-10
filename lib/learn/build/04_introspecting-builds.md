## Introspecting builds


Now that you've downloaded a build you're able to run them as follows:

```sh
docker run -it --rm build-<BUILD-ID> /bin/bash
```

This gives you a prompt inside the container. Now you can jump into the
`pipeline` directory and have a look at the contents of your build
pipeline.

Make sure you have sufficient permissions on a project to pull builds.

[&lsaquo; Pulling builds](/learn/build/03_pulling-builds.html "nav previous build")
[Deploy &rsaquo;](/learn/deploy/01_introduction.html "nav next deploy")
