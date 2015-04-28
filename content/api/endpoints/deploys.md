# Deploys
Whenever a deploy is triggered, wercker creates a dpeloy with a new id. Deploys
start with a status of `not started` and then proceed to be `finished`. When a
build is finished it has a result field that is either `passed` or `failed`.

| method | route                                    | description |
| ------ | -----                                    | ----------- |
| GET    | `app.wercker.com/api/v3/deploys/:deploy` | get a deploy with id `:deploy`

### GET deploys/:deploy
Retrieve a deploy with the specified id.
