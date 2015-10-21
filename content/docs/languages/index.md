---
tags: languages
---

## Language Guides

Below you will find a list of example wercker.yml's to get started with wercker and specific
programming languages.


### Golang

[Read our full language guide for Golang](/docs/languages/golang.html)

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

```

### Nodejs

[Read our full language guide for Nodejs](/docs/languages/nodejs.html)

```yaml
box: nodesource/trusty
# Build definition
build:
  # The steps that will be executed on build
  steps:
    # A step that executes `npm install` command
    - npm-install
    # A step that executes `npm test` command
    - npm-test

    # A custom script step, name value is used in the UI
    # and the code value contains the command that get executed
    - script:
        name: echo nodejs information
        code: |
          echo "node version $(node -v) running"
          echo "npm version $(npm -v) running"

```

### Python

[Read our full language guide for Python](/docs/languages/python.html)

```yaml
# use a small python 2.x container
box: python:2-slim

# Build definition
build:
  # The steps that will be executed on build
  steps:
    # A step that executes `pip install` command
    - pip-install

    # A custom script step, name value is used in the UI
    # and the code value contains the command that get executed
    - script:
        name: python unit test
        code: |
          python app_test.py
```

### Ruby

[Read our full language guide for Ruby](/docs/languages/ruby.html)

```yaml
box: phusion/passenger-ruby22
build:
    steps:
        - bundle-install
        - script:
            name: rspec
            code: bundle exec rspec
```
