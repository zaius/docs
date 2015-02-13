---
tags: golang
---

## Golang

This article describes how to get started with the `go` programming
language and wercker.

### Table of Contents

* The box
* Useful steps
* Complete wercker.yml
* Sample application

### The box

The Docker Hub has a
[container](https://registry.hub.docker.com/_/golang/) that has multiple versions of `go`
installed. There is also an official Google
[container](https://registry.hub.docker.com/u/google/golang/) available
as well. If you want to cross compile using
[gox](https://github.com/mitchellh/gox) you can leverage the container created by
[tcnksm](https://registry.hub.docker.com/u/tcnksm/gox/).

Define your selected container in your [wercker.yml
file](/learn/wercker-yml/01_introduction.html) using the `box` clause.

```yaml
box: google/golang
```

### Useful steps

* setup-go-workspace
* golint
* s3sync and mhook

#### setup-go-workspace

This step adds the project within your build pipeline to the go
workspace hierarchy

Usage:

```yaml
build:
    steps:
        - setup-go-workspace 
```

#### golint

A lint step for go source code that uses
[golint](https://github.com/golang/lint).

Usage:

```sh
build:
    steps:
        - golint
```

#### s3sync and mhook

As compiled go applications are single binaries, they are easily
shippable and deployable to s3.

### Complete wercker.yml

```yaml
# use the official google golang container

box: google/golang

# Build definition
build:
  # The steps that will be executed on build
  steps:
        
    # Sets the go workspace and places you package
    # at the right place in the workspace tree
    - setup-go-workspace 

    # golint step!
    - wercker/golint
    
    # Build the project
    - script:
        name: go build
        code: |
          go build ./...

    # Test the project
    - script:
        name: go test
        code: |
          go test ./...

          ### TODO: deploy section
```

### Sample application

You can checkout and clone a sample application in golang at the
following location:

[getting-started-golang]()
