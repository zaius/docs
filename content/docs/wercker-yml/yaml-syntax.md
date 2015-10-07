## YAML Syntax

This article will explain some rules that YAML has in place, and because YAML is
pretty strict with formatting this will help to quickly overcome some common pitfalls
with using YAML.

#### Indentation

First off, spaces are used instead of tabs, as tabs are not universally supported.
Wrongly indenting a line is a small mistake that is hard to spot and can lead to
a failing build. For that reason, we recommend you to use 4 spaces while indenting lines.

> YAML does not allow the use of tabs.

Example of two script steps with correct indentation.

```yaml
- script:
    name: echo python information
    code: |
        echo "python version $(python --version) running"
        echo "pip version $(pip --version) running"
```

```yaml
- script:
  name: deploy
  code: |
     ./scripts/deploy --target $ENVIRONMENT \
        --run-migrations \
        --api-key $API_KEY \
        --api-secret $API_SECRET
```


#### Mappings

Mappings use a colon followed by a space `: ` to mark each key/value pair.

```yaml
box: google/golang
```

Example of a nested mapping: to setup the use of a private container.

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

Strings can be `unquoted`, `single` and `double-quoted`.
If you wrap text or numbers with quotes it will be forced as a string.

#### Comments

Comments can be added in YAML by prefixing them with a hash mark `#`:

```yaml
box: nodesource/trusty
# Build definition
```

Some helpful links on YAML

* [YAML Lint](http://www.yamllint.com/)
* [Official Yaml 1.2 documentation](http://www.yaml.org/spec/1.2/spec.html)
* [Yaml reference card](http://www.yaml.org/refcard.html)
