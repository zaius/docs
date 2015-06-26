## Roles & permissions

Currently there are three roles defined within wercker:

1. build + view deploys
2. build + deployment
3. admin

### Build + view deploys

A user with **build + view deploys** permissions can see builds, build steps together with its details, view deploy logs and can follow/unfollow applications. A note about deploy logs: some sensitive information may be visible in the deploy logs, but wercker allows some output to be hidden from the view.


### Build + deployment

A user with **build + deployment** permissions can do all things a user with **build + view deploys** permissions can, but can also trigger deploys and create new deploy targets.

### Admin

Like the owner of an application, users with admin permissions can do the same as with **build + deployment** permissions and also:

* change permissions for collaborators
* manage the SSH Keys
* change public / private setting
* change the repository access
* change the infrastructure stack
* change the API user
* change the ownership of a application
* delete the application
