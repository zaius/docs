### Building in the cloud

Wercker allows you to build in the cloud with every `git push`.  Let's see how
that works exactly.

### Adding your app to wercker 
For the purpose of this guide, we assume you have already [set up your wercker
account](https://app.wercker.com/users/new) and added your GitHub or Bitbucket
connection (_settings_ -> _git connections_ -> _connect_).

The next step is to create a new application on wercker. Head over to
[https://app.wercker.com/](https://app.wercker.com/) and select _create_ ->
_application_.

#### Select your Git Provider
First select your Git provider, after which a list of your existing
repositories on either GitHub or BitBucket is presented. Select the python
example you forked earlier from the list and click on **Use selected repo**. 

![image](/images/select_repo.png)

#### Select the owner
Now we have to choose who owns the app. For this tutorial, go ahead and select
yourself. If you like, you can also select an organization you created on
wercker. Click on **Use selected owner** once you're ready.

#### Configure Access
The next step is about configuring access, and the first option - **checkout
the code without using an SSH key** - is fine for the purpose of this tutorial,
because it's an open source and public application. So go ahead and click
**Next step**

![image](/images/configure_access.png)

#### Configuring the wercker.yml
At this point wercker will try to detect if you have a **wercker.yml** file in
your repository and if not, try to make one for you. However, we already have a
**wercker.yml** file so let's change that and click **I already have a
wercker.yml**. Be sure to leave the **Docker enabled** as it is.

#### Finishing up
Finally, once you've verified all the settings you can click **Finish** to
complete setting up our app!  When done, you will be redirected to your very
own app page, which looks empty now, so let's go ahead and change that. 

### Triggering your first build

Wercker will automatically trigger a build every time you push new code to your
Git provider. Let's see that in action. In your working directory, run

```
$ git commit -am 'wercker build time!'
$ git push origin master
```

![image](/images/wercker_build.png)

### Wrapping up
Next, navigate to your app page and you should see a new build has been
triggered! This build will do the exact same as the one you triggered locally
but now everyone in your team can see and comment on the build. 

Congratulations! You've built your first app using wercker. The next tutorial
in this series will be about how to deploy your python app to a Digital Ocean
server (Coming soon!).
