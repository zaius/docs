### Global Options

This section provides an overview of all available global options. Options or
flags that need additional explanation will also be outlined here.

```no-highlight
GLOBAL OPTIONS:
   --environment "ENVIRONMENT"   specify additional environment variables in a file
   --verbose                     print more information
   --no-colors                   wercker output will not use colors (does not apply to step output)
   --debug                       print additional debug information
   --journal                     Send logs to systemd-journald. Suppresses stdout logging.
   --auth-token                  authentication token to use
   --help, -h                    show help
   --version, -v                 print the version
```

#### --environment

Specify additional environment variables in a file. Read more about using 
environment variables [here](/cli/configuration/environment-variables.html).

### Build & Dev flags

This section contains flags that can be used when building or developing
locally using [wercker dev](/cli/usage/developing.html) or
[wercker build](/cli/usage/building.html).

```no-highlight
OPTIONS:
   --working-dir 					Path where we store working files.
   --build-dir "./_builds"				Path where created builds live.
   --cache-dir "./_cache"				Path for storing pipeline cache.
   --container-dir "./_containers"			Path where exported containers live.
   --project-dir "./_projects"				Path where downloaded projects live.
   --step-dir "./_steps"				Path where downloaded steps live.
   --deploy-target 					The deploy target name. [$WERCKER_DEPLOYTARGET_NAME]
   --docker-host 					Docker api endpoint. [$DOCKER_HOST]
   --docker-tls-verify "0"				Docker api tls verify. [$DOCKER_TLS_VERIFY]
   --docker-cert-path 					Docker api cert path. [$DOCKER_CERT_PATH]
   --docker-local					Don't interact with remote repositories
   --direct-mount					Mount our binds read-write to the pipeline path.
   --publish [--publish option --publish option]	Publish a port from the main container, same format as docker --publish.
   --commit 						Commit the build result locally.
   --tag 						Tag for this build. [$WERCKER_GIT_BRANCH]
   --message 						Message for this build.
   --artifacts						Store artifacts.
   --no-remove						Don't remove the containers.
   --store-local					Store artifacts and containers locally.
   --store-s3						Store artifacts and containers on s3.
   --aws-secret-key 					Secret access key. Used for artifact storage.
   --aws-access-key 					Access key id. Used for artifact storage.
   --s3-bucket "wercker-development"			Bucket for artifact storage.
   --aws-region "us-east-1"				AWS region to use for artifact storage.
   --source-dir 					Source path relative to checkout root.
   --no-response-timeout "5"				Timeout if no script output is received in this many minutes.
   --command-timeout "25"				Timeout if command does not complete in this many minutes.
   --wercker-yml 					Specify a specific yaml file.
```

#### --docker-local

This flag can be used with either [wercker dev](/cli/usage/developing.html) or
[wercker build](/cli/usage/building.html). When using this flag, wercker will
not attempt to connect to a remote repository when pulling or pushing images,
but will instead look for container images locally, or when using the
[internal/docker-push](/docs/steps/internal-steps.html#docker-push), it will
push images to the local repository.

#### --publish

Used together with [wercker dev](/cli/usage/developing.html). Exposes a port from
the container to the host.

`wercker dev --publish 1337`

#### --no-remove

When developing locally, you can opt not to remove the development containers
locally.

#### --store-s3

You can store your container images and artefacts on Amazon S3 while building
or developing. You'll also need to specify `--aws-secret-key`,
`--aws-secret-access-key` , `--s3-region` and `--s3-bucket`.

#### --aws-secret-key

When storing artefacts on S3, this key needs to be set.

#### --aws-secret-access-key

When storing artefacts on S3, this key needs to be set.

#### --s3-bucket

When storing artefacts on S3, specify which bucket it needs to be saved to.

#### --aws-region

When storing artefacts on S3, specify which region wercker should use.

