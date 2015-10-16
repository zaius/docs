
## Kubernetes

In this tutorial, we will build and launch a containerized application on top
of [Kubernetes](http://kubernetes.io). Kubernetes is a cluster orchestration
framework started by Google, specifically aimed at running container workloads.
We will use [quay.io](http://quay.io) from [CoreOS](http://coreos.com) for our
container registry and [wercker](https://wercker.com) (of course!) to build the
container and trigger deploys to Kubernetes.

You can watch the screencast below that walks you through the tutorial.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PXLL3e7iW40" frameborder="0" allowfullscreen></iframe>

The workflow we will create is depicted below:

![image](/images/kubernetes.png)

### Requirements

This tutorial assumes you have the following set up:

* A wercker account. You can sign up for free [here](https://app.wercker.com/users/new).
* An account on [quay.io](https://quay.io/).
* A Kubernetes cluster. See the [getting started section](http://kubernetes.io/gettingstarted/) to set one up.
* A fork of the application we will be building which you can find on [GitHub](https://github.com/wercker/wercker-kubernetes-quay).
* You've added the above application to wercker and are using the [Docker stack](http://blog.wercker.com/2015/04/02/Introducing-our-docker-stack.html) to build it.

### Getting started

The application we will be developing is a simple API with one endpoint, which
returns an array of cities in JSON. You can check out the source code for the
API on
[GitHub](https://github.com/wercker/wercker-kubernetes-quay/blob/master/main.go).
The web process listens on port `5000`; we'll need this information later on.
Now, let's create our Kubernetes service configuration and include it into our
repository.

```json
{
   "kind": "Service",
   "apiVersion": "v1beta3",
   "metadata": {
      "name": "cities",
      "labels": {
         "name": "cities"
      }
   },
   "spec":{
      "createExternalLoadBalancer": true,
      "ports": [
         {
           "port": 5000,
           "targetPort": "http-server",
           "protocol": "TCP"
         }
      ],
      "selector":{
         "name":"cities"
      }
   }
}
```

We define the port that our application is listening on and use the public IP
addresses that we got upon creating our Kubernetes cluster. We're using [Google
Container Engine](https://cloud.google.com/container-engine/), which allows for
`createExternalLoadBalancer`. If you're using a platform which doesn't support
`createExternalLoadBalancer` then you need to add the public IP addresses of
the nodes to the `publicIPs` property.  Next, we're going to define our
pipeline, which describes how wercker will build and deploy your application.

### wercker.yml - build pipeline

On wercker, you structure your pipelines in a file called
[wercker.yml](http://devcenter.wercker.com/docs/wercker-yml/index.html). It’s
where you define the actions (steps) and environment for your tasks (tests,
builds, deploys). Pipelines can either pass or fail, depending on the results
of the steps within. Steps come in three varieties; steps from the wercker step
[registry](https://app.wercker.com/#explore/steps/search/), inline `script`
steps and `internal` steps that run with extra privileges.  Pipelines also come
with environment variables, some of which are set by default, others you can
define yourself. Each pipeline can have its own base container (the main
language environment of your application) and any number of services
(databases, queues).  Now, let's have a look at our build pipeline for the
application. You can check out the entire wercker.yml on
[GitHub](https://github.com/wercker/wercker-kubernetes-quay/blob/master/wercker.yml).

```yaml
build:
    box: google/golang
    steps:

    # Test the project
    - script:
        name: go test
        code: go test ./...

    # Statically build the project
    - script:
        name: go build
        code: CGO_ENABLED=0 go build -a -ldflags '-s' -installsuffix cgo -o app .

    # Create cities-controller.json only for initialization
    - script:
        name: create cities-controller.json
        code: ./create_cities-controller.json.sh

    # Copy binary to a location that gets passed along to the deploy pipeline
    - script:
        name: copy binary
        code: cp app cities-service.json cities-controller.json "$WERCKER_OUTPUT_DIR"
```

The `box` is the container and environment in which the build runs. Here we see
that we're using the `google/golang` image as a base container for our build as
it has the golang language and build tools installed in it. We also have a
small unit test inside of our code base which we run first. Next we compile our
code and build the `app` executable.  As we want to build a minimal container,
we will statically compile our application. We disable the ability to create Go
packages that call C code with the `CGO_ENABLED=0` flag, rebuild all
dependencies with the `-a` flag, and finally we remove any debug information
with the `-ldflags` flag, resulting in an even smaller binary.  Next, we create
our Kubernetes replication controller programmatically based on the git commit
using a shell script. You can check out the shell script on
[GitHub](https://github.com/wercker/wercker-kubernetes-quay/blob/kubectl_step/create_cities-controller.json.sh).
The last step copies the executable and Kubernetes service definitions into the
`$WERCKER_OUTPUT_DIR` folder, and the contents of this folder gets passed along
to the `/pipeline/source/` folder within the deploy pipeline.

### wercker.yml - push to quay.io
We're now ready to set up our deploy pipelines and targets. We will create two
deploy targets. The first will push our container to Quay.io, the second will
perform the rolling update to Kubernetes. Deploy targets are created in the
wercker web interface and reference the corresponding section in the
`wercker.yml`.

![image](/images/targets.png)

In order to add any information such as usernames, passwords, or tokens that
our deploy target might need, we define these as environment variables for each
target. These environment variables will be injected when a pipeline is
executed.  [Quay.io](http://quay.io) is a public and private registry for
[Docker](http://docker.com) image repositories. We will be using Quay.io to
host the container image that is built from wercker.

```yaml
deploy:
    box: google/golang
    steps:
     # Use the scratch step to build a container from scratch based on the files present
    - internal/docker-scratch-push:
        username: $QUAY_USERNAME
        password: $QUAY_PASSWORD
        cmd: ./app
        tag: $WERCKER_GIT_COMMIT
        ports: "5000"
        repository: quay.io/wercker/wercker-kubernetes-quay
        registry: https://quay.io
```

The deploy section of our
[wercker.yml](http://devcenter.wercker.com/docs/wercker-yml/index.html) above
consists of a single step. We use the `internal/docker-scratch-push` step to
create a minimal container based on the files present in the `$WERCKER_ROOT`
environment variable (which contains our binary and source code) from the
build, and push it to Quay.io. The `$QUAY_USERNAME` and `$QUAY_PASSWORD`
parameters are environment variables that we have entered on the wercker web
interface. For the tag, we use the git commit hash, so each container is
versioned. This hash is available as an environment variable from within the
wercker pipeline.  The `cmd` parameter is the command that we want to run on
start-up of the container, which in our case is our application that we've
built. We also need to define the port on which our application will be
available, which should be the same port as in our Kubernetes service
definition. Finally, we fill in the details of our Quay.io repository and the
URL of the registry.  If you take a look at your Quay.io dashboard you will see
that the final container that was pushed is just 1.2MB!

### wercker.yml - Kubernetes rolling update

For this tutorial, we assume you've already created a service with an
accompanying replication controller. If not, you can do this via wercker as
well. See the initialize section in the
[wercker.yml](https://github.com/wercker/wercker-kubernetes-quay/blob/kubectl_step/wercker.yml#L39-L52)
Let's proceed to do the rolling update on Kubernetes, replacing our pods
one-by-one.

```yaml
   rolling-update:
     - kubectl:
        server: $KUBERNETES_MASTER
        username: $KUBERNETES_USERNAME
        password: $KUBERNETES_PASSWORD
        insecure-skip-tls-verify: true
        command: rolling-update cities
        image: quay.io/wercker/wercker-kubernetes-quay:$WERCKER_GIT_COMMIT
```

The environment variables are again defined in the wercker web interface. The
`$KUBERNETES_MASTER` environment variable contains the IP address of our
instance.

![image](/images/pipeline.png)

We execute the rolling update command and tell Kubernetes to use our Docker
container from Quay.io with the `image` parameter. The tag we use for the
container is the git commit hash.

### Conclusion

In this tutorial, we have showcased how to build minimal containers and use
[wercker](http://wercker.com) as our assembly line. Our final container was
just 1.2MB, making for low-cost deploys!  Though the go programming language
compiles to single binaries, making our life easier, our learnings can be
applied to other programming languages as well.

Using wercker's automated build process we've not only created a minimal
container, but also linked our artifact versioning to git commits in Quay.io.
Pairing our versioned containers with Kubernetes' orchestration capabilities
results in a radically simplified deployment process, especially with the power
of rolling updates!

In short, the combination of Kubernetes, Quay.io and wercker is a powerful and
disruptive way of building and deploying modern-day applications.  In this
article we've just scratched the surface of developing container-based
microservices. To learn more about Kubernetes check out the [getting started
guides](http://kubernetes.io/gettingstarted/). For more information on Quay.io,
see the documentation [site](http://docs.quay.io/). You can sign up for wercker
[here](https://app.wercker.com/users/new) and more information and
documentation is available at our [dev center](http://devcenter.wercker.com/).
The source code for our final application including its `wercker.yml` is
available on [GitHub](https://github.com/wercker/wercker-kubernetes-quay).

