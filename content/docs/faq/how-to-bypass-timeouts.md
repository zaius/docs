---
tags: timeout
---

## How do I bypass the timeout for builds?

Wercker will stop the build if it doesn't generate any output for 5 minutes.
It can be overriden by settings `no-response-timeout` to the number of minutes of your liking:

```yaml
box: google/golang
no-response-timeout: 10
build:
   ... # insert build section here
```

