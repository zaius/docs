## Using SSH Keys

Before you can actually use an SSH key you will have to create an
environment variable to hold the key.

[Read more on creating environment variables &rsaquo;](/docs/environment-variables/creating-env-vars.html)

### Add to known hosts pipeline step

Depending on the container you are using, you may want to use this step to
prevent builds/deploys from halting when you setup a connection with them:

```no-highlight
The authenticity of host 'some-server.wercker.com (1.2.3.4)' can't be established.
RSA key fingerprint is ff:ee:dd:cc:bb:aa:99:88:77:66:55:44:33:22:11:00.
Are you sure you want to continue connecting (yes/no)?
```

```yaml
deploy:
  steps:
    - add-to-known_hosts:
        hostname: ssh.example.com
        fingerprint: ce:83:e9:7d:02:a4:e3:63:3f:8a:07:cc:d5:d9:bb:cd
```

[Read more on the step add-to-known_hosts &rsaquo;](https://app.wercker.com/#applications/521764dde36a64ff110022f2/tab/details)

### Add ssh key pipeline step

Using this step in combination with an SSH key allows you to use that key for SSH operations, such as cloning a private repository:

```yaml
build:
    steps:
        - add-ssh-key:
            keyname: MYPACKAGE_KEY
```

Now your SSH key can be used to clone private repositories during a pipeline run.
This solution works as long as we clone via SSH (i.e. not using https).

* [Read more on the step add-ssh-key &rsaquo;](https://app.wercker.com/#applications/523afff01aa016c8590015b1/tab/details)
* [Read more on how to use submodules &rsaquo;](/docs/git/submodules.html)

