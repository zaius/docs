## Docker Hub

Wercker currently supports containers obtained from the [Docker
Hub](https://hub.docker.com), a marketplace for various Docker
containers, ranging from language stacks to databases.

### Getting containers from the Hub

In order to use these containers you have to specify them in your
[wercker.yml](/learn/wercker-yml/01_introduction.html). You at least
need to specify  the main language stack you want to use via the `box`
section. 

>Currently only public repositories on the Hub are supported.

Private repositories are not yet supported in wercker, so make sure your
containers are public on the Hub.

#### Specifying versions

Docker repositories can hold various versions of an image. Tags can be leveraged to specify a specfic version of a container.

> When using containers make sure you specify the correct tag for the
container you want to use.

You can specify a version tag in your
[wercker.yml]((/learn/wercker-yml/01_introduction.html) as follows.

```yaml
# using python version 2.7
box: python:2.7
```

Without specifying a tag you will get the latest build of the container
on the Hub, which in this case contains python version 3.

```yaml
# using python version 
box: python
```

In the next section we'll explain how you can use containers in your
local environment.

[&lsaquo; Introduction to containers](/learn/containers/01_introduction.html "nav previous containers")
[Using containers &rsaquo;](/learn/containers/03_using-containers.html "nav next containers")
