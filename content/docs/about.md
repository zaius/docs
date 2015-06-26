## About wercker
Wercker is a Docker-based platform for developing, building and delivering your
applications. Wercker provides you with a toolchain and cloud platform to speed
up your development process. It allows you to build apps for the 21st century
by containerizing your code and automating your development pipelines.

### Why wercker
At wercker, we believe that micro-services are the future. However, with great
power comes great responsibility and micro-services naturally introduce a lot
of extra moving parts in your application. To fully leverage the advantages of
micro-services, they should be managed carefully.

Wercker lets you do just that. By setting up automated development pipelines,
very much in the spirit of "_release early, release often_", you can build and
deploy your services with just a `git push`. You can then let wercker compile
and run any other _steps_ that are necessary to build your project before it
gets deployed to a [target](http://devcenter.wercker.com/docs/deploy/deploy-steps.html) 
of your choosing. 

Under the hood wercker leverages Docker containers to not only allow automated
pipelines, but also isolated environments to run code in. Wercker runs your
code in a container and takes it through what we call
[_steps_](http://devcenter.wercker.com/docs/steps/about-steps.html) and saves
the output as a container.

Wercker also works for developers working on websites, blogs or apps that are
not neccesarily as complex. Because wercker is also a **workflow** and not only
a platform, we encourage you to start using wercker from the get-go with
[`wercker dev`](http://blog.wercker.com/2015/05/15/Introducing-local-development.html).
This sets you up with a container locally and allows you to start developing in
that container, without changing your existing workflow. 


### Reference list
Below you will find a table explaining all the concepts and terminology you
will find throughout the documentation. 

| Concept | Explenation |
|:--------|:------------|
| After-Step | A step that gets executed after Pipeline has failed or passed. Ideal for notifications or other subsequent triggers. |
| Application | Your project, with all its settings, git information and Pipelines. |
| Box | Abstract definition for the container that runs your pipeline. |
| Build | A single execution of a build Pipeline. |
| Container | A Docker or LXC container that holds the programming environment, dependencies and libraries for your pipelines to function. |
| Deploy | A single execution of a deploy Pipeline. |
| Deploy Target | A target that a Deploy Pipeline needs to be executed on. This could be a Virtual Machine, Heroku, S3 an API, Container Registry or any endpoint you can execute actions (Steps) on. |
| Environment | An entire set of Environment Variables. | 
| Environment Variable | A key value pair that holds a specific set of information such as a token, username or SSH key. Environment Variables can hold plain text (username), be protected (hidden, for instance for passwords) or hold an SSH key. Environment Variables look as follows: USERNAME=mies and be leveraged by referencing it as follows: $USERNAME. Environment Variables can be assigned to either an entire Pipeline or a Deploy Target. |
| Parameters | The arguments and options you pass along to a Step. |
| Pipeline | A sequential execution of Steps of which the end result can either pass or fail. |
| Registry | The marketplace that contains all the steps developed by the community. |
| Service | A container that is spun up separate from you main pipeline and runs something like a database, message queue that you need for your Pipelines to run. Note that a service could also be another application that you've created on wercker. |
| Stack | The underlying infrastructure that runs your Pipelines. There are currently two versions. Ewok (Docker-based) and the newest. Classic (Andorian) which runs LXC containers and will be deprecated. |
| Step | Steps are individual units of work, they can pass or fail, and a failing step will prevent the execution of a step after it.  There are three flavors of steps: <ul><li> 1. An external step from the Registry, created by wercker itself or the community. It comes in the form of $username/$step_name </li><li> 2. Script step, an inline piece of code that gets turned into a run.sh on the fly </li><li> 3. Internal Step implemented by the wercker CLI that runs with enhanced privileges that aren't available in the container </li></ul>|
| wercker.yml |  Your Pipelines codified into a single file that wercker needs to execute the Pipelines. |

