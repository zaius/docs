---
tags: steps, registry
---

## Creating steps

Aside from using steps in the [step registry](/learn/steps/04_step-registry.html) you can also create your own. Steps are similar to any other projects on wercker but isntead of deploying to a cloud provider, you deploy to the step registry in order to make the step available.

Wercker steps are git repositories no different from your own projects aside from a couple of things:

* The project needs to include a `run.sh` file which is the entry-point of your step
* The project needs to include a step manifest file call `wercker-step.yml`

Though technically a step can be written in *any* language, we recommended writing them in `bash` or in `golang`.
The former is usually installed on most Docker containers whereas the latter is a single binary. Both programming languages do not require any dependencies or libraries to be present that might not be installed in various Docker containers people use, making them quite portable.

### The Step Manifest file

The step manifest file defines the configuration of your step. Below an example of a wercker step manifest.

```yaml
name: slack-notifier
version: 1.0.1
description: Posts wercker build/deploy status to a Slack channel.
keywords:
  - notification
  - webhook
  - slack
properties:
  url:
    type: string
    required: true
  channel:
    type: string
    required: false
  username:
    type: string
    required: false
  notify_on:
    type: string
    required: false
  icon_url:
    type: string
    required: false
```

The `name` field is the name of your step. In order to use your step you would include your step as follows in your [wercker.yml](/docs/wercker-yml/creating-a-yml.html) file:

```yaml
- <username>/<stepname>:
```

In order to use a specific version, let's say version `1.0.1` you would do this as follows:

```yaml
- <username>/<stepname>@1.0.1:
```

When developing your steps make sure you bump the version number when deploying your steps to the registry.

The `description` field is a sensible description of you step so other users can quickly see what your step does.

The `keywords` field are tags to identify your step

If your step needs parameters you specify these via the `properties` field. This could be a URL you need to `POST` to or any other logic that you need in the step you are creating.

### The run.sh file

The `run.sh` file containes the entrypoint your step logic. This could be `bash` code in the `run.sh` file itself or the calling of a separate program (for instance created in golang).

You can check out the complete repository of the wercker slack notification step on [GitHub](https://github.com/wercker/step-slack)