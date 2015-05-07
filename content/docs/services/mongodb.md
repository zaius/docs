---
tags: mongodb, services
---

## MongoDB
You can run the standard Docker MongoDB image without requiring any extra parameters to be passed in. 

### Setup
To use the basic [docker Image](https://registry.hub.docker.com/_/mongo/) in your build, you can use the following wercker.yml as a starting point:

```
# wercker.yml
box: yourbox
services:
   - id: mongo
build:
   steps:
(...)
```

### Env vars
Docker will expose the following env vars, which you can use to connect to mongo from within your application. 

```sh
MONGO_ENV_MONGO_MAJOR=3.0
MONGO_PORT=tcp://172.17.0.20:27017
MONGO_ENV_MONGO_VERSION=3.0.2
MONGO_PORT_27017_TCP=tcp://172.17.0.20:27017
MONGO_PORT_27017_TCP_PROTO=tcp
MONGO_PORT_27017_TCP_ADDR=172.17.0.20
MONGO_NAME=/wercker-pipeline-554b80083ff4b3ee38001450/mongo
MONGO_PORT_27017_TCP_PORT=27017
```

To learn about how to find out the IP adress of a service container you should use the environment variables exposed by Docker. You can read more about that in our article [_availble env vars_](http://devcenter.wercker.io/docs/services/available-env-vars.html).
