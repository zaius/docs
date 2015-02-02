## Using environment variables

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

[How it works &rsaquo;](/learn/pipelines/02_how-it-works.html "nav previous pipelines")
[Packaging &rsaquo;](/learn/pipelines/04_packaging.html "nav next pipelines")
