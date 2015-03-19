---
tags: organisations
---

## Adding an app to an organization

When you're part of an **owners** team you can add applications to an organization.

There are two ways of adding an application to your organization. One is through the **add application** wizard, and the second one is to transfer the ownership of an existing application to your organization.

### Add application wizard

When adding a new application on wercker you now have the option to choose the owner of the application.

![image](/images/select-owner.jpg)

When the app is created the **owners** team automatically gets **admin** permissions to the application, as you can see in the collaborators section of the application settings.

![image](/images/collaborators.jpg)

Now you can start adding the teams you want to collaborate with on the new application.


### Transfer ownership

You can also transfer the ownership of an existing application to an organization. Note that you can only do this when you're on the **owners** of an organization.

![image](/images/transfer-ownership.jpg)

> When you're transferring an application all the access that has been granted earlier, automatically gets revoked. This is done because the “owners” team is responsible for all management of an organization and they can re-add those users through teams.

We give an extra warning when you're about to because at this moment it is not possible to transfer an application back to a user or to an other organization.


### API user

Normally the owner's GitHub or Bitbucket credentials are used for setting the status of builds and to make various API calls.

Because an organization doesn't have the option to connect to GitHub or Bitbucket we added an extra option to select which user's credentials are used to do those API calls.

![image](/images/api-user.jpg)

When you're adding or transferring an application wercker will automatically set you as the API user on that application.

