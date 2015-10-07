## Protected variables

Protected variables functionality was added to limit the exposure of sensitive
information via the interface. The behavior of the variables during pipeline runs
(builds/deploys) are the same as other variables, but with the following exceptions:

Protected variables are not displayed/logged during the setup environment step
values are not shown in the settings tab and can only be set, not read back.
This behavior is optional for variables of type `text`, `SSH key pairs` however
are automatically marked as protected.

> Please not that the value of a protected environment variable is not available to copy or edit.

[Read more on creating env vars &rsaquo;](/docs/environment-variables/creating-env-vars.html)
