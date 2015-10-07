---
tags: timeout
---

## How do I bypass the timeout for builds?

Wercker will stop the build if it doesn't generate any output for 5 minutes.
It can be overridden by settings `no-response-timeout` to the number of minutes of your liking:

```yaml
box: google/golang
no-response-timeout: 10
build:
   ... # insert build section here
```

## How do I increase the timeout for individual steps?

In case you want to increase the time-limit for individual steps (from the
default 25 minutes) you add the following to your `wercker.yml`:

```yaml
box: google/golang
command-timeout: 30
build:
   ... # insert build section here
```

Note that 60 minutes is the maximum amount of time you can allocate to
a step with this option.