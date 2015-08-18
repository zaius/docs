---
tags: docker
---

## Can I build Dockerfiles on Ewok?

Currently, no.

Dockerfiles allow you to execute commands on the host system (in this case: us), which is something we can't allow yet. We are interested in finding a solution to this issue, until then most of the same functionality is available by defining those commands as shell steps in your wercker.yml (and in many cases re-using steps already defined by the community).

We are working on providing some of the Docker commands as internal steps that you can leverage.

You can read a more in-depth article about our reasoning on our
[blog](http://blog.wercker.com/2015/07/28/Dockerfiles-considered-harmful.html)
