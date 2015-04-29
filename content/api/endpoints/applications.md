# Applications
Access applications. Applications are either owned by users or organizations.

## Endpoints
| method | route | description |
| ------ | ----- | ----------- |
| GET | `app.wercker.com/api/v3/applications` | retrieve applications for which the user is authorized |
| GET | `app.wercker.com/api/v3/applications/:username` | retrieve applications owned by `:username` |
| GET | `app.wercker.com/api/v3/applications/:username/:application` | retrieve the details for application `:username/:application` |
| GET | `app.wercker.com/api/v3/applications/:username/:application/builds` | retrieve the builds for application `:username/:application` |
| GET | `app.wercker.com/api/v3/applications/:username/:application/deploys` | retrieve the deploys for application `:username/:application` |

## /applications (to be implemented)
Retrieve applications for which the user is authorized

## /applications/:username
Retrieve applications owned by `:username`

## /applications/:username/:application
Retrieve the details for application `:username/:application`

## /applications/:username/:application/builds
Retrieve the builds for application `:username/:application`

## /applications/:username/:application/deploys
Retrieve the deploys for application `:username/:application`
