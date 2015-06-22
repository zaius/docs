# Using git Submodules

You will have to fetch submodules manually. Below a snippet of a `wercker.yml` step
that does exactly that:

```yaml
   - script:
        name: install git
        code: |
            apt-get update
            apt-get install git -y
    - add-ssh-key:
        keyname: KEY_NAME
        host: github.com
    - add-to-known_hosts:
        hostname: github.com
        fingerprint: 13:47:Cc:FA:KE:28:NO:T6:RE:A7:56:4d:eb:df:a6:48
    - script:
        name: initialize git submodules
        code: |
            git submodule update --init --recursive
```

