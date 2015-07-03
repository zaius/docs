## YAML Syntax

This article will explain some rules that YAML has in place, and because YAML is
pretty strict with formatting this will help to quickly overcome some common pitfalls
with using YAML.

#### Indentation

First of, spaces are used instead of tabs, as tabs are not universally supported.
Indenting is a small mistake that can lead to a failing build and are hard to spot,
that is why we advise to use 4 spaces.

> YAML does not allow the use of tabs.

Example of a script step with a indentation of 4 spaces

```yaml
- script:
    name: echo python information
    code: |
        echo "python version $(python --version) running"
        echo "pip version $(pip --version) running"
```

#### Mappings

Mappings use a colon followed by a space `: z to mark each key/value pair.

```yaml
box: google/golang
```

Example of a nested mapping to setup the use of a private container.

```yaml
box:
    id: quay.io/knuth/golang
    username: $USERNAME
    password: $PASSWORD
    tag: beta
    registry: quay.io
```

#### Lists

Example of how we use a list to create a pipeline.

```yaml
build:
    steps:
        - step
        - step
        - step
```

#### Strings

#### Comments

Comments can be added in YAML by prefixing them with a hash mark `#`:

```yaml
box: nodesource/trusty
# Build definition
```

Some helpfull links on YAML

* [YAML Lin](http://www.yamllint.com/)
* [Official Yaml 1.2 documentation](http://www.yaml.org/spec/1.2/spec.html)
* [Yaml reference card](http://www.yaml.org/refcard.html)
