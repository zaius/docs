## Step registry

The step registry is a marketplace of [steps](/docs/steps/index.html) created by
the wercker community. All [steps](/docs/steps/index.html) are currently public
and free for all users to incorporate in their [pipelines](/docs/pipelines/index.html).


### Finding a step

The registry makes it easy to search for [steps](/docs/steps/index.html) by `name`, `owner`, `description` or `tag`,
and sort by popularity.

> Since everybody can create steps, you may want to check the code of the steps
> before you use them, you may want to limit yourself to official wercker steps.

[Go and explore the step registry &rsaquo;](https://app.wercker.com/#explore/steps/search/)

### Detail page

Each [step](/docs/steps/index.html) has a detailed page that shows all the information you need to start using it.
In the header you will find some basic information on the version number, who published it, last updated
and how many times it has been executed.

#### How to use it

Copying and pasting the example code to your `wercker.yml` is the quickest way
to start using a [step](/docs/steps/index.html).

> Most the of steps need [environment variables](/docs/environment-variables/index.html) setup to work

#### Read me

Each [step](/docs/steps/index.html) also shows the `README.MD` that is located in the Git repo.
This usually tells you a bit more what the available `options` of that step are,
which `environment variables` it expects, how to use it and what it actually does.


### Creating steps

The [creation of steps](/docs/steps/creating-steps.html) is currently not supported
in the Docker enabled (Ewok) version of wercker. All `steps` that are currently
deployed in the step registry are however available to use, as well as new ones
created on the `Classic` version of wercker.

If you are looking in to creating your own custom [step](/docs/steps/index.html), continue reading the following link.

[Read more on creating your own steps &rsaquo;](/docs/steps/creating-steps.html)
