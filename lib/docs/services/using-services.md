---
tags: services
---

## Using services

Services are separate containers in your pipelines that you need
alongside your *main* language stack container.

Service containers are *spun up separate* from the main container.
Examples of services are databases and queues. You specify service
containers in your [wercker.yml](/docs/wercker-yml/creating-a-yml.html) file through the `services` clause:

```yaml
- services:
    - mongodb
```

Having multiple services is also possible:

```yaml
- services:
    - mongodb
    - redis
```

Tags specify a version of your service container:

```yaml
services:
    - mongodb:2.2.7
```

Though the above syntax is short and sweet, sometimes you need to pass
along more information to you service container. As such you probably
want to be explicit in defining your service containers and
reference them through an id:

```yaml
services:
    - id: mongodb
```

Sometimes services need additional environment variables injected in
them:

```yaml
services:
    - id: mongodb
    - env:
      USERNAME: foo
      PASSWORD: bar
```

Please check the documentation of the container you are using if
additional environment variables need to be injected in the container or
not.
