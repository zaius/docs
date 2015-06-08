# Using git Submodules

Submodules are not supported with v2 out of the box you can however initialize
submodules through a script step as explained below:

```yaml
    - script:
        name: initialize git submodules
        code: |
            cd ..
            git submodule update --init --recursive
```