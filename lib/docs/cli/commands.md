---
tags: cli
---

## Available commands

The wercker command line interface comes with the following commands:

```bash
COMMANDS:
   build, b     build a project
   deploy, d    deploy a project
   detect, de   detect the type of project
   login, l     log into wercker
   pull, p      pull a build result
   version, v   display version information
   help, h      Shows a list of commands or help for one command
```

The *detect* command introspects your projects and generates
[wercker.yml](/learn/wercker-yml/01_introduction.html) files for your
projects.

> Currently go, python, nodejs and ruby are supported in the detect
> command

The *build* and *deploy* commands execute these pipelines locally. Using
the *pull* command you can download a container from the wercker
platform and use *inspect* to debug this container locally.
