## Environment variables

What if you have an API key you need during a deploy or during a build? This is
information that is either unique for each server you want to deploy to
or may be too sensitive to store in the repository. Wercker supports a number
of ways to store and expose this data as environment variables.

If you want to know which environment variables are available during a build
or deploy, look at the `environment variables` step of your pipeline run.
You can also use a script step and use the export command to see the full list
of all variables at that moment during the build/deploy. This is convenient
since there are reasons why the environment variables step does not show all
environment variables available during the pipeline run.

```yaml
- script:
    code: |
        export
```

First of all, there are variables which are __global__. They are available
during builds and deploys. Typically, these are used to store API tokens for
after-steps such as hipchat, campfire etc.

These variables are called __pipeline variables__ and can be set in the settings
tab of your application.

The second set of variables are specific to deploy targets, and can only be set
directly on the deploy target. Typically, these are used to store information
such as hostnames, ssh-keys, passwords and more. These variables are called
__deploy target variables__


### Data types

The interface supports two types of data:

* text (which can be set as protected)
* SSH key pairs


### Protected variables

Protected variables functionality was added to limit the exposure of sensitive
information via the interface. The behavior of the variables during pipeline
runs (builds/deploys) are the same as other variables, but with the following
exceptions:

* protected variables are not displayed/logged during the setup environment step
* values are not shown in the settings tab and can only be set, not read back.

This behaviour is optional for variables of type text, SSH key pairs however
are automatically marked as protected.


### SSH Key pairs

Another common type of information used during deploys (but also during builds)
are SSH key pairs. Wercker can help you generate them for you and will only
expose the public part of the pair via the interface. During a pipeline run,
the key pair is exposed via two environment variables ending with: \_PRIVATE
and \_PUBLIC.


[&lsaquo; Sections](/learn/wercker-yml/03_sections.html "nav previous yml")
[Creating a yaml &rsaquo;](/learn/wercker-yml/05_creating-a-yml.html "nav next yml")
