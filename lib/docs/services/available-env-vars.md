---
tags: environment variables
---

## Available environment variables

Wercker uses [dockerlinks](https://docs.docker.com/userguide/dockerlinks
/#environment-variables) in order to enable interaction between containers.
Every service that is specified in your **wercker.yml** will be linked to the
main box, where your application lives. In doing so, Docker exposes the service
container’s environment variables to the current environment.  For example,
should you want to use [ElasticSearch](http://elasticsearch.com) as a service in
your application, the following env variables would be injected: 
```
ELASTICSEARCH_PORT_9200_TCP_PORT=9200
ELASTICSEARCH_ENV_JAVA_DEBIAN_VERSION=8u40~b22-2 
ELASTICSEARCH_NAME=/wercker-pipeline-xxxxxxxxxxx/elasticsearch 
ELASTICSEARCH_PORT_9200_TCP_PROTO=tcp
ELASTICSEARCH_PORT_9300_TCP_PORT=9300
ELASTICSEARCH_PORT_9300_TCP_ADDR=172.17.1.89
ELASTICSEARCH_ENV_CA_CERTIFICATES_JAVA_VERSION=20140324
ELASTICSEARCH_ENV_ELASTICSEARCH_VERSION=1.4.4
ELASTICSEARCH_ENV_JAVA_VERSION=8u40~b22
ELASTICSEARCH_PORT=tcp://172.17.1.89:9200
ELASTICSEARCH_PORT_9200_TCP=tcp://172.17.1.89:9200
ELASTICSEARCH_PORT_9300_TCP=tcp://172.17.1.89:9300
ELASTICSEARCH_PORT_9300_TCP_PROTO=tcp
ELASTICSEARCH_PORT_9200_TCP_ADDR=172.17.1.89 
```

The best way to see these variables while your build is running is by adding an
extra step to your wercker.yml file.  
``` 
# wercker.yml 
box: tcnksm/gox:1.3.3
services:
   - elasticsearch 
build:
   steps:
     - script:
         name: env
         code: env 
(...) 
``` 
In order to utilise these env vars, in your application you
would simply query the environment for the variables you are looking for. In
this example, you would want the IP and the port elasticsearch is running on. In
Go this would look something like this:

```
fmt.Println(“IP:", os.Getenv("ELASTICSEARCH_PORT_9300_TCP_ADDR”))
fmt.Println(“PORT:", os.Getenv("ELASTICSEARCH_PORT_9300_TCP”))
```

Which would output
```
172.17.1.89
9300
```

