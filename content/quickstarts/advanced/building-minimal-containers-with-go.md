## Building a Go app for scratch containers

Containers offer developers a lot of benefits, one of them being portability.
However, portability implies ease of transferring containers from one machine
to another. The average container however, ranges from 600MB to 5G in size. 

That does not sound very portable, and so in this guide we will go over how to
build apps for `scratch` containers: container images based on a minimal
set of features. You can read more about scratch containers
[here](https://docs.docker.com/articles/baseimages/).

To achieve this, we will develop the app in Golang, which can be statically compiled
and as such does not rely on dynamic C dependencies to run. 

### Making the app

This will be the app we will run on the scratch container:

```
package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type CitiesResponse struct {
	Cities []string `json:"cities"`
}

func CityHandler(res http.ResponseWriter, req *http.Request) {
	citiesResponse := &CitiesResponse{
		Cities: []string{
			"San Francisco",
			"Amsterdam",
			"Berlin",
			"New York",
			"Tokyo",
			"Kyoto",
			"Osaka",
			"Nagasaki",
			"Naha",
			"London",
			"Paris",
			"Seoul",
			"Austin",
		},
	}
	data, _ := json.MarshalIndent(citiesResponse, "", "  ")
	res.Header().Set("Content-Type", "application/json; charset=utf-8")
	res.Write(data)
}

func main() {
	log.Println("Listening on this host: http://localhost:5000")

	http.HandleFunc("/cities.json", CityHandler)
	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		log.Fatal("Unable to listen on :5000: ", err)
	}
}
```

This app is pretty straightforward. It is a web-based application that listens on
port 5000 and has a single endpoint `/cities.json` which returns a list of cities.
You can save this code as `main.go`. 

Next, let's define our build pipeline. 

### Build Pipeline

We define all our build pipelines in the
[wercker.yml](/docs/wercker-yml/index.html). For this guide, we'll use the
following **wercker.yml**: 

```
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

    # Copy binary to a location that gets passed along to the deploy pipeline
    - script:
        name: copy binary
        code: cp app "$WERCKER_OUTPUT_DIR"
```

The `box` is the container and environment in which the build runs. Here we see
that we're using the `google/golang` image as a base container for our build as
it has the golang language and build tools installed in it. We also have a
small unit test inside of our As we want to build a minimal container, we will
statically compile our application. We disable the ability to create Go
packages that call C code with the `CGO_ENABLED=0` flag, rebuild all
dependencies with the `-a` flag, and finally we remove any debug information.

The last step copies the executable into the
`$WERCKER_OUTPUT_DIR` folder, and the contents of this folder gets passed along
to the `/pipeline/source/` folder within the deploy pipeline.

We're now ready to push our container to a registry - in this case
[Quay.io](https://quay.io).

### Deploy Pipeline

The first step is to create a new deploy target for our application on
https://app.wercker.com. This deploy target will hold the necessary information
that is needed to deploy to Quay.io. 

![image](/images/building_scratch_app_deploy_target.png)

In order to add any information such as usernames, passwords, or tokens that
our deploy target might need, we define these as environment variables for our
target. These environment variables will be injected when a pipeline is
executed. [Quay.io](http://quay.io) is a public and private registry for
[Docker](http://docker.com) image repositories. 

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
        repository: quay.io/<your-repo>
        registry: https://quay.io
```

The deploy section of our
[wercker.yml](/docs/wercker-yml/index.html) above
consists of a single step. We use the `internal/docker-scratch-push` step to
create a minimal container based on the files present in the `$WERCKER_ROOT`
environment variable (which contains our binary and source code) from the
build, and push it to Quay.io. The `$QUAY_USERNAME` and `$QUAY_PASSWORD`
parameters are environment variables that we have entered on the wercker web
interface. For the tag, we use the git commit hash, so each container is
versioned. This hash is available as an environment variable from within the
wercker pipeline.  The `cmd` parameter is the command that we want to run on
start up of the container, which in our case is our application that we've
built. We also need to define the port on which our application will be
available. Finally, we fill in the details of our Quay.io repository and the
URL of the registry.  If you take a look at your Quay.io dashboard you will see
that the final container that was pushed is just 1.2MB!


