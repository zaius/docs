## Predefined after step variables

The following variables are available to after-steps:

| Variable name | Example | Purpose     |
|:--------------|:--------|:------------|
| `WERCKER_RESULT` | failed | Contains either passed or failed and shows the result of the build/deploy |
| `WERCKER_FAILED_STEP_DISPLAY_NAME` | jshint | Contains the name of the step as being displayed in the interface |
| `WERCKER_FAILED_STEP_MESSAGE` | 3 errors found | Some steps set extra information (see writing output) |
