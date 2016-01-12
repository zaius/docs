---
tags: cli
---

## Requirements

On linux it is easy to install Docker depending on your distribution and package manager. See Docker's [installation instructions](https://docs.docker.com/installation/#installation) for more information and for Docker Machine see [here](https://docs.docker.com/machine/install-machine/).

In order to make use of all of the features within the CLI you will need a working Docker environment. If you are running Mac OSX you can install Docker and Docker-Machine using [Docker Toolbox](https://www.docker.com/docker-toolbox). Docker Toolbox is an installer to quickly and easily install and setup a Docker environment on your computer. Toolbox installs the Docker Client, Docker Machine, Docker Compose, Docker Kitematic and VirtualBox.

If you haven't already, download [Docker Toolbox](https://www.docker.com/docker-toolbox).

### OSX Docker Machine quick start

Essentially Docker Machine creates a host on an instance of Virtual Box that you can then use with the Docker client to build, run, and monitor your Docker containers.

From the official [Docker documentation](https://docs.docker.com/machine/),
>Machine lets you create Docker hosts on your computer, on cloud providers, and inside your own data center. It automatically creates hosts, installs `Docker` on them, then configures the docker client to talk to them. A “machine” is the combination of a Docker host and a configured client.

To confirm there weren't any hiccups try entering the command `docker-machine ls` in a shell session. If everything went well and assuming this is the first time you are running the command, you should see something like this

```no-highlight
$ docker-machine ls
NAME   ACTIVE   DRIVER   STATE   URL
```

Notice there currently aren't any machines listed, which makes sense since you haven't created any yet.

To create a machine, we run the `docker-machine create` command, passing the string `virtualbox` to the `--driver` flag. The final argument we pass is the name of the machine - in this case, we will name our machine `dev`, but you can name it whatever you want.

You should see something like
```no-highlight
$ docker-machine create --driver virtualbox dev
Running pre-create checks...
Creating machine...
Waiting for machine to be running, this may take a few minutes...
Machine is running, waiting for SSH to be available...
Detecting operating system of created instance...
Provisioning created instance...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
To see how to connect Docker to this machine, run: docker-machine env dev
```

Now if we run `docker-machine ls` again we should see our newly created `dev` machine.

```no-highlight
$ docker-machine ls
NAME   ACTIVE   DRIVER       STATE     URL                         SWARM
dev    -        virtualbox   Running   tcp://192.168.99.100:2376
```

That's all there is to it to create a machine and get it running! For more info on `docker-machine` and its features see [here](https://docs.docker.com/machine/get-started/).

Now we need to tell `Docker` to be able to talk to your previously created `dev` machine. We do that with the `docker-machine env` command.

In order to see the Docker certificates and environment variables you can run the `docker-machine env YOUR-MACHINE-NAME-HERE` command.

It should look something like this

```no-highlight
$ docker-machine env dev
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.101:2376"
export DOCKER_CERT_PATH="$HOME/.docker/machine/machines/dev"
export DOCKER_MACHINE_NAME="dev"
# Run this command to configure your shell:
# eval "$(docker-machine env dev)"
```

In order to configure our shell with the appropriate Docker environment variables and certificates
we need to run the `eval "$(docker-machine env YOUR-MACHINE-NAME-HERE)"` command in our shell. If everything was successful you shouldn't see any output from that command.

> Note that this only activates Docker in the **current** shell session

Since this only works for the current shell session and to avoid having to remember to run the `eval "$(docker-machine env YOUR-MACHINE-NAME-HERE)"` command each time you open a new shell session you might consider adding the first 3 listed `exports` from the `docker-machine env dev` command to your `.profile`, `.bashrc`, `.zshrc`, or other shell configuration file.

And you're done! You should now have Docker Client, Docker Machine, Docker Compose, Docker Kitematic and VirtualBox installed, at least one Docker Machine created and running, and configured Docker to communicate to that machine.