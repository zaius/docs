## Adding a new application

For adding new applications on wercker we created a simple wizard.
The wizard will take you through a couple of guided steps to get the best setup
from the get go.

When you are logged in, you can choose to create a new 'Application' from the
create drop-down.

![image](/images/adding-a-new-application_1.jpg)

### Step 1: Choose a Git provider

We first allow you to select your git provider, currently either GitHub or Bitbucket.
If you’ve already authorized wercker to connect with either of these platforms,
we will show you this as well.

![image](/images/adding-a-new-application_2.jpg)

### Step 2: Select a repository

We now present you with a list of repositories, and also show if a repository is
private, public, and if it’s a fork of another repo. We offer an input field
which you can use to filter your repositories, making the selection even snappier.

![image](/images/adding-a-new-application_3.jpg)

In addition to the private and public status of a repo, we also show when a
repository is already added to wercker. When that is the case, you can choose to
join and become a collaborator on that repository. When joining you will get
`Build + view deploys` access rights to the app.

You are not allowed to join an application if the repository was already added
by an organization. This is because all collaborator management is done by the
owners of that organization.

### Step 3: Select owner

When you’re part of an owners team you can add applications to an organization.

![image](/images/adding-a-new-application_4.jpg)

### Step 4: Configure access

Wercker uses an SSH key to checkout the code to run a build. For private repositories
you need to add a public SSH key as a deploy key to your repository, or you can
add this public SSH key to a user which has access to the repository.

For public repositories you don’t have to add a public SSH key, you just need to make sure
you selected the public repository option in the repository access settings of
the application.

See the section on [repository access](/docs/web-interface/repository-access.html)
for more information on this.

![image](/images/adding-a-new-application_5.jpg)

### Step 5: Setup your wercker.yml

Now, wercker is ready to help you with the `wercker.yml` file. It could of course
be the case that you’ve already added a `wercker.yml` to your repository.
This step automatically detects the presence of a `wercker.yml` in your repository.

If the `wercker.yml` is not present we will try to detect the programming language
of your project and present a suggested wercker.yml file with sensible defaults
that you need to commit and push to your repository.

[Read more on the wercker.yml &rsaquo;](/docs/wercker-yml/index.html)

![image](/images/adding-a-new-application_6.jpg)

By default our `Docker stack` is enabled. There are differences in supported
features per stack. When you switch of the `Docker stack` you will notice the
content of the wercker.yml changes to make sure you are using the correct
environment to run your builds in.

[Read more on the Docker and classic stack &rsaquo;](/docs/pipelines/stacks.html)

### Step 6: Finishing up

You are almost there! Set your application to `public` if you want to share it
with the world. Public applications will only show your builds.

When clicking the `Finish` button you will be taken to the main application page.
