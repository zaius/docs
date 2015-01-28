## After steps

Both a build and deploy pipeline can contain `after-steps` steps that need to be executed after a build or deploy has either failed or passed.

A good use-case for `after-steps` are [notifications](/articles/werckeryml/notifications.html) to an [IRC channel](https://app.wercker.com/#applications/51f2a14ddf5a46247c000cf7/tab/details) or [HipChat Room](https://app.wercker.com/#applications/51f26c380771b3526e000c1c/tab/details), closing an issue on a project management system or sending out a newsletter after a succesful deploy.

Below an example example of leveraging the [hipchat-notify](https://app.wercker.com/#applications/51f26c380771b3526e000c1c/tab/details) step to send a message after a deploy on wercker. We make use of the `after-steps` element to signify that the message has to be sent after the deploy.

``` yaml
deploy:
   after-steps:
        - hipchat-notify:
            token: $HIPCHAT_TOKEN
            room_id: id
            from-name: name
```

[&lsaquo; Using steps](/learn/steps/02_using-steps.html "nav previous steps")
[Notifications &rsaquo;](/learn/steps/04_notifications.html "nav next steps")
