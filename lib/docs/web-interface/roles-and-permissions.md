---
tags: example
---

## Roles & permissions

There are three roles defined at this moment, with increasing amount of permissions these are:

1. build
2. build+deploy
3. admin

#### build

A user with build permissions can see builds, build steps together with its details, view deploy logs and can follow/unfollow applications. A note about deploy logs: some sensitive information may be visible in the deploy logs, but wercker allows some output to be hidden from the view.


#### build+deploy

A user with build+deploy permissions can do all things a user with build permissions can, but can also trigger deploys and create new deploy targets.

#### admin

Like the owner of a project, users with admin permissions can do the same as with build+deploy permissions and also:

* change settings on the project (set the application to public/private)
* change permissions for collaborators
* change the ownership of a project.
