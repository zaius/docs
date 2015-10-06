---
tags: ecs, amazon
---

## Amazon Elastic Container Service

For this tutorial, we'll be deploying a 3-tiered microservice application
consisting of a simple frontend, an API and a redis backend. This application
is a simple statistics counter that increases every time a page is viewed.  The
goal will be to easily deploy these services and allow for easy scaling,
leveraging ECS and wercker.

![image](/images/page_views.png)

To follow along you will need to fork the following repositories and [add them
as new projects to wercker](https://app.wercker.com/#applications/create):

* [wercker/ws_web](https://github.com/wercker/ws_web)
* [wercker/ws_api](https://github.com/wercker/ws_api)

You will also need a working Docker environment and the [wercker
CLI](http://wercker.com/downloads).

Finally, you will need an ECS cluster to deploy the applications to. You can
read more about setting up ECS
[here](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/get-set-up-for-amazon-ecs.html).
Alternatively you can use the wizard provided by Amazon that you can find when
you access the ECS page on the [AWS
console](https://console.aws.amazon.com/ecs/home#/firstRun).

Once you're set up, we can start building our distributed system!

### Setting up ECS

Before we can deploy our applications, we need to provide ECS with some context
to run our applications in.  This context consists of two things: **services**
and **tasks**.

**Services** allow you to run and maintain a specified number of instances of a
task definition simultaneously.

**Task definitions** define your container topology for a single "task".
**Tasks**, in turn,  are the execution of these task definitions. We'll be
setting up a single service, that will start out with a single task. This task
will run three containers: our frontend, the API and a redis container.

First, we have to create our task. Head over to **Task Definitions** and select **Create New Task Definition**.
In the following screen, hit the **JSON** tab and copy in the following contents:

```json
{
  "taskDefinitionArn": "arn:aws:ecs:us-east-1:694210971302:task-definition/wercker-counter:6",
  "status": "ACTIVE",
  "revision": 6,
  "containerDefinitions": [
    {
      "volumesFrom": [],
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 5001,
          "protocol": "tcp"
        }
      ],
      "command": null,
      "environment": [],
      "essential": true,
      "entryPoint": null,
      "links": [
        "api"
      ],
      "mountPoints": [],
      "memory": 500,
      "name": "frontend",
      "cpu": 10,
      "image": "wercker/frontend"
    },
    {
      "volumesFrom": [],
      "portMappings": [],
      "command": [
        "python",
        "/pipeline/source/app.py"
      ],
      "environment": [],
      "essential": true,
      "entryPoint": null,
      "links": [
        "redis"
      ],
      "mountPoints": [],
      "memory": 500,
      "name": "api",
      "cpu": 10,
      "image": "wercker/api"
    },
    {
      "volumesFrom": [],
      "portMappings": [],
      "command": null,
      "environment": [],
      "essential": true,
      "entryPoint": null,
      "links": null,
      "mountPoints": [],
      "memory": 500,
      "name": "redis",
      "cpu": 10,
      "image": "redis"
    }
  ],
  "volumes": [],
  "family": "wercker-counter"
}
```

Then, hit **create** and you will be presented with an overview of our task
definition. For now, select the task that you just created,
**wercker-counter**, hit **actions** and select **create service**.  In the
wizard, we want to call our service **wercker** and set the amount of task runs
to **0**, for now. Hit **create service** to finish it off. This is the manual
way of creating a service, but the next step is to automate this process using
wercker and the ECS API.

![image](/images/create_service.png)

### The ws_web application

Now that we've setup ECS, we can take a look at the projects that we will be
deploying. The `ws_web` project will serve as the frontend for our application.
Let's briefly examine what this project does.

In the `ws_web` project directory, open up your `wercker.yml`:

```yaml
dev:
  services:
    - redis
    - id: api
      url: file://../ws_api#dev
      cmd: python /pipeline/source/app.py
  steps:
    - pip-install
    - internal/watch:
        name: start web server
        code: python app.py
        reload: true
build:
  services:
    - redis
    - wercker/api
  steps:
    - pip-install
    - script:
        name: copy artifacts
        code: |
          cp wercker-app.json app.py requirements.txt $WERCKER_OUTPUT_DIR
deploy:
  box: python:2.7-slim
  dockerhub:
  - pip-install
  - internal/docker-push:
      username: $DOCKER_USER
      password: $DOCKER_PASS
      repository: wercker/frontend
      cmd: "python /pipeline/source/app.py"
      ports: 5001
  aws-ecs:
  - script:
      name: copy
      code: mkdir /app && cp wercker-app.json /app/
   - tonnu/aws-ecs:
      key: $AWS_ACCESS_KEY
      secret: $AWS_SECRET_KEY
      region: us-east-1
      cluster-name: default
      service-name: hello
      task-definition-name: hello
      task-definition-file: /app/hello-task-definition.json
      minimum-running-tasks: 1
```

In the `wercker.yml` file we describe the various pipelines that we want to
execute. Let's start at the top and examine the `dev` pipeline, which is the
pipeline that gets executed when we want to develop our application (using the
`wercker dev` command).

```yaml
dev:
  services:
    - redis
    - id: api
      url: file://../ws_api#dev
      cmd: python /pipeline/source/app.py

  steps:
    - pip-install
    - internal/watch:
        name: start web server
        code: python app.py
        reload: true
```

You can see that the frontend requires two services to run: `redis` and
`api`. The `redis` service will be downloaded from Docker Hub, while the
`api` service is located on disk as a seperate wercker project, so we reference it
as such. We won't be going into how the `ws_api` project works too much here,
but feel free to check out the code to see what happens under the hood.

Once the services are launched, we'll tell wercker that we want to
`pip-install` our dependencies and then start our app. We also specify that we
want to re-run the `python app.py` command every time wercker detects code
changes on disk using `reload: true`.

If you want, you can run `wercker dev` in the `ws_api` project directory to see
it all run!

### Building our frontend

Now that we know how we can continuously develop our applications inside
containers, we want to build the final artifact that will be deployed to ECS.
Let's examine the `build` pipeline:

```yaml
build:
  services:
    - redis
    - wercker/api
  steps:
    - pip-install
    - script:
        name: copy artifacts
        code: |
          cp wercker-app.json app.py requirements.txt $WERCKER_OUTPUT_DIR
```

For the sake of this tutorial, we've kept the build pipeline for the frontend
pretty straightforward. We pip-install our dependencies and then in the next
step copy the neccessary artifacts to the `$WERCKER_OUTPUT_DIR`. This will make
the artifacts that we need to run our application available in our `deploy`
pipeline, which will run inside a different, minimal container.

Also note that, since we will run the `build pipeline` on wercker's hosted
platform, we can no longer specify a project on disk for the `api` project.
But since that project is built independently and is deployed to Docker Hub, we
can specify the Docker Hub repository instead. We don't need to change anything
in our code to facilitate this change.

For the purpose of this tutorial, we've already built the `ws_api`
application and pushed it to Docker Hub so there is no need to build the project
again right now. Instead we will use the `wercker/ws_api` image (found
[here](https://dockerhub.com/wercker/ws_api)).

Now that we've defined our build pipeline, we get to the interesting part:
deployment!

### Deployment

Deploying our distributed app consists of two phases: pushing the latest image
to Docker Hub and then calling the ECS API to run and update our tasks with the
new container definitions. Let's take a look at your `wercker.yml` to see how
these deployments are set up.

```yaml
deploy:
  box: python:2.7-slim
  dockerhub:
    steps:
    - pip-install
    - internal/docker-push:
          username: $DOCKER_USER
          password: $DOCKER_PASS
          repository: wercker/frontend
          cmd: "python /pipeline/source/app.py"
          ports: 5001
  aws-ecs:
    steps:
     - script:
         name: copy
         code: mkdir /app && cp wercker-app.json /app/
     - tonnu/aws-ecs:
        key: $AWS_ACCESS_KEY
        secret: $AWS_SECRET_KEY
        region: us-east-1
        cluster-name: default
        service-name: hello
        task-definition-name: wercker-counter
        task-definition-file: /app/wercker-app.json
        minimum-running-tasks: 1
```

The first thing to notice is that we're using a different container image to
run our code in, `python:2.7-slim`. Since we already have all our build
artifacts ready to go, we don't need the hefty python image that we were using
in our build pipeline.

Next, we define our first deploy target, `dockerhub`. This deploy target
contains the `-pip-install` step and the `internal/docker-push` step, which
will take the image that we're running our pipeline in and push it to Docker
Hub. We make use of environment variables to pass in our credentials.  We'll
need to define those environment variables on our application's settings page
(more on that later).  This step takes care of phase one: deploying our image
to Docker Hub.

Our second phase is initiated by the second deploy target, called `aws-ecs`.
In this deploy target, we specify a script step that again copies the relevant
files to the `/app` directory. The second step, `tonnu/aws-ecs` then handles
the deploy to ECS. At this point you should make sure that the properties match
your ECS setup that you created earlier. 

This step will create a new task for our **wercker** service we created
earlier, with the following definition (found in `wercker-app.json` in the
project folder):

```json
[
    {
      "name": "frontend",
      "links": [
        "api"
      ],
      "image": "wercker/frontend",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5001,
          "hostPort": 80
        }
      ],
      "memory": 500,
      "cpu": 10
    },
    {
      "name": "api",
      "image": "wercker/api",
      "cpu": 10,
      "memory": 500,
      "essential": true,
      "links": [ "redis" ],
      "command": ["python", "/pipeline/source/app.py"]
    },
    {
      "name": "redis",
      "image": "redis",
      "cpu": 10,
      "memory": 500,
      "essential": true
    }
]
```

This JSON file describes our three tiered web application topology. We specify
which images to use, and more importantly which links should be made between
the containers, by using the `links` property. This property tells ECS that
these containers should be able to communicate with each other.  Our frontend
needs the API to make some calls, and the API in turn needs Redis to write the
data.

Basically, that's all we need to deploy and run our application on ECS! Easy
enough, right?

Also big thanks to [1science](https://github.com/1science/wercker-aws-ecs) for
making the original version of this step! 

### Setting up the deploy targets
Head over to your application page on wercker and navigate to settings.  Head
to **targets** and on the targets page click **Add deploy target** to create a
new one. Call it `dockerhub`. You'll then need to repeat this process for our
second deploy target, which will be `aws-ecs`.

![image](/images/deploy_targets.png)

Then, in your `dockerhub` deploy target page, add a new environment variable.
Call it `DOCKER_USER` and fill in your Docker Hub username. Repeat this process
for your `DOCKER_PASS`.

Finally, for your `aws-ecs` deploytarget add your `AWS_ACCESS_KEY` and
`AWS_SECRET_KEY` as environment variables, which we will need when deploying to
ECS. When creating these environment variables, be sure to set them to
**protected** so no one can read them.

### Running the builds & deploys

Now that we've setup all pipelines, we can start triggering them! Trigger the
build pipeline by pushing some new code to the repository. Then, once the build
on wercker finishes, select the **deploy-to** dropdown on the build page and
select the **dockerhub** option. Your app should now enter the deploy pipeline
for the **dockerhub** deploy target that we specified earlier. 

![image](/images/deploy_to_dropdown.png)

If you want, you can now change the task definition, found in the
**wercker-app.json** file in the project directory, to reflect your own
container that you just pushed, instead of the default **wercker/frontend**
image that is used (just remember to commit the changes so wercker runs a new
build).

When the deploy is finished, go back to your build page and select the
**deploy-to** drop down once more. This time select **aws-ecs** as deploy
target. Wercker will now start deploying our application to ECS.

The step will first register the new task on ECS, called
**wercker-counter**, and send the corresponding task definition (which is the
**wercker-app.json** file) along with it.

Then the step will check if it can run the new task, depending on the required
amount of tasks for the service, and how many are currently running. If
required, the step will scale down any task that is running in order to make
room for the new task.

When the task definition is updated, it will scale back up to the desired
amount of tasks for that service, effectively finishing our deploy.

![image](/images/wercker_deploy_progress.png)

If you now head over to your service in the ECS console, you should see that a
new task has been triggered. Click on the **frontend** container to see the IP
that the container can be reached on. Navigating to that IP should give you our
nice little page view counter! Go ahead and refresh a couple of times to see
what happens (the pageviews might not be very accurate due to an alleged bug in
the code!).

![image](/images/active_task.png)

### Wrapping up

Following this tutorial you spun up your first microservices app on ECS. That
means you can now automatically and continuously deploy your microservices!
While that's pretty awesome, there are a lot of other interesting aspects that
we haven't touched upon, one of them being scaling and the fact that every
container in our application gets restarted (which will make us lose our
state).That's why we're going to follow up with a part two of this tutorial,
where we'll explain how to scale your containers horizontally and implement a
load balancer to connect all the pieces.
