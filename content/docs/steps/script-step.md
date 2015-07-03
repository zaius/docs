---
tags: custom
---

## Script step

This type of [step](/docs/steps/index.html) allows you to execute a single or
more shell commands.  It has one required property: `code` and (as always) you
can use the `name` property to give the step a clear name.

Here are some examples that run one or more commands:

```yaml
build:
    steps:
        - script:
            name: indentify distribution
            code: cat /etc/lsb-release
        - script:
            name: starting xvfb
            code: |
              # Start xvfb which gives the context an virtual display
              # which is required for tests that require an GUI
              export DISPLAY=:99.0
              start-stop-daemon --start --quiet --pidfile /tmp/xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -screen 0 1024x768x24 -ac +extension GLX +render -noreset
              # Give xvfb time to start. 3 seconds is the default for all xvfb-run commands.
              sleep 3
```

### wercker classic

When writing logic in bash scripts (for the [classic stack](/docs/wercker-yml/wercker-classic.html)),
it is good to keep in mind that commands are executed line by line. This means if
statements, for loops, etc. should be written as single line statements. If you
don't, your pipeline run will stall and eventually timeout without executing
the second line.
