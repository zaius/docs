---
tags: environment variables
---

## PostgreSQL

The default [postgres docker image](https://registry.hub.docker.com/_/postgres/) requires a password to be passed in as an argument, alongside an optional username. 

However, because you cannot run docker commands direclty in wercker, you have to use the [`env`] tag in your **wercker.yml** file (as described [here](http://devcenter.wercker.io/docs/services/advanced-services.html)) :

``` 
# wercker.yml 
box: yourbox
services:
   - id: postgres
     env:
       POSTGRES_PASSWORD: ourlittlesecret
       POSTGRES_USER: myuser  # optional
build:
   steps:
(...) 
```

Now the [`POSTGRES_PASSWORD`] environment variable is set to _ourlittlesecret_ inside your service container and you can start using it! 

To learn about how to find out the IP adress of a service container you should use the environment variables exposed by Docker. You can read more about that in our article [_availble env vars_](http://devcenter.wercker.io/docs/services/available-env-vars.html).
