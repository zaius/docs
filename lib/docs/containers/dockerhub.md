---
tags: docker
---

## Docker Hub

For your pipelines you can use containers obtained from the [Docker
Hub](http://hub.docker.com).

You at least need to specify  the main language stack you want to use via the `box`
section. 

Wercker automatically fetches these containers when your
pipelines are executed. If you need `service` containers such as
databases, specify them in the [services](/docs/services/using-services.html) section of your [wercker.yml
file](/docs/wercker-yml/build-section.html).

Note that currently only public repositories from Docker Hub are supported.

Private repositories are not yet supported in wercker, so make sure your
containers are public on Docker Hub.
