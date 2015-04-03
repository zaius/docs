---
tags: packages, dependencies
---

## Installing packages

Sometimes you need specific dependencies inside your container. You can install
custom packages with the `install-packages` step.

### Options

`packages`: (required) The name(s) of the packages to install. Separate packages using a space.

### Example

Installs three packages `git`, `subversion` and `apache2`:

```yaml
    - install-packages:
        packages: git subversion apache2
```

You can also specify version:

```yaml
    - install-packages:
        packages: apache2=2.2.20-1ubuntu1
```
