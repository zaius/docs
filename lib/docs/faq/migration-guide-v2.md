---
tags: migrating
---

## How do I migrate to wercker v2?

In this article we go over the items to take into consideration when
migrating your application to wercker v2 (Ewok).

### Table of contents

* Docker containers
* Git Submodules
* Using sudo

#### Docker containers

The classic `boxes` system no longer works in wercker v2. Instead, you
can now use Docker containers in your
[wercker.yml](http://localhost:1337/learn/wercker-yml/03_sections.html).

In the example below the officual [Ruby
container](https://registry.hub.docker.com/u/library/ruby/) from the
Docker Hub is used.

```yaml
box: ruby
```

If you want to use a container from a different user you specify this as
follows:

```yaml
box: nodesource/node
```

Here we use the nodejs
[containter](https://registry.hub.docker.com/u/nodesource/node/) from
[Nodesource](https://nodesource.com/).

If we want to specify a specific version or tag we do that in the
following way:

```yaml
box: nodesource/node:trusty
```

This is the Ubuntu Trusty Tahr (14.04) image with the Nodesource
binaries baked in.

#### Git Submodules

#### Using Sudo

The `sudo` command is no longer supported in wercker v2 and effectively
does nothing when used.

#### Deployment

As all build artifacts are effectively containers deploy targets other
than custom are no longer supported. Please not that if you update a
project to make use of Docker (Ewok version) and this project has
autodeployment, this deploy will most likely fail. We will update our documentation in
the future on how to deploy these containers.
