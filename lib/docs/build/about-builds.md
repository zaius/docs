---
tags: builds
---

## About builds

A build is an execution either run on wercker or run locally using the wercker 
command. This can encompass your unit tests but also any other steps such as 
minifying javascript, compass compiliation, installing dependencies and 
packaging your code, thus readying it for deployment.

Wercker supports two ways of running builds: locally and in the [cloud](/docs/build/cloud-builds.html)

Each build has a number of fixed and configurable steps. Here are the fixed steps:

* get code (cloud only). 
* setup environment (cloud & locally).
* wercker-init (cloud & locally). 
* optional steps (defined in your wercker.yml)
* store (cloud only).

### get code
During this step wercker retreives the code from 
Bitbucket/GitHub.

### setup environment
During this step the relevant docker 
containers are being pulled.

### wercker-init
This steps executes a small script that injects some utility bash functions. 
For more information see the [wercker-init repository](https://github.com/wercker/wercker-init)

### store
During this step two outputs of the pipeline run are stored; both the
source code as tarball and a container (also compressed as a tarball)

