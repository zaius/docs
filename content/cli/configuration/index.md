### Global flags

#### --docker-local

This flag can be used with either [wercker dev](/cli/commands/dev.html) or
[wercker build](/cli/commands/build.html). It will not attempt to connect to a
remote repository when pulling or pushing images, but will instead look for
container images locally, or when using the
[internal/docker-push](/docs/steps/internal-steps.html#docker-push), it will
push images to the local repository.

#### --publish

Used together with [wercker dev](/cli/commands/dev.html).

#### --no-remove

When developing locally, you can opt not to remove the development containers
locally.  Alternatively, you can use the
[internal/docker-push](/docs/steps/internal-steps.html#docker-push) together
with the [--docker-local](/cli/configuration/global-flags.html#docker-local) flag.

#### --store-s3

You can store your container images and artefacts on Amazon S3 while building
or developing. You'll also need to specify `--aws-secret-key`, `--aws-secret-access-key`
, `--s3-region` and `--s3-bucket`.

#### --aws-secret-key

When storing artefacts on S3, this key needs to be set.

#### --aws-secret-access-key

When storing artefacts on S3, this key needs to be set.

#### --s3-bucket

When storing artefacts on S3, specify which bucket it needs to be saved to.

#### --aws-region

When storing artefacts on S3, specify which region wercker should use.

