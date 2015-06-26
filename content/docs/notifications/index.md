## Notifications

Wercker offers three different type of notifications.

* Built-in system notifications
* Built-in email notifications
* Custom notififier after-steps

### Built-in notifications

The built-in notifications will notify you on build and deploy events, collaborator
changes, and comments.

[Read more on our built-in notifications &rsaquo;](/docs/web-interface/notifications.html)

> Get those same system notifications on your desktop with our
> [nofitier app](http://www.wercker.com/downloads) for OSX.

### Notification steps

Notifications steps are invoked as [pipeline after-steps](/docs/steps/after-steps.html).
These will be run after a build or deploy, regardless of if the result has
failed or passed.

```yaml
    after-steps:
        - slack-notifier:
            url: $SLACK_URL
            channel: notifications
            username: werckerbot
            notify_on: "failed"
```

And because you can create your own custom `pipeline steps` with wercker, a wide
variety can already be found in our
[step registry](https://app.wercker.com/#explore/steps/search/notify).

For example these two `after-steps` are created by wercker and ready to be used:

* [HipChat after step](/docs/notifications/hipchat.html)
* [Slack after step](/docs/notifications/slack.html)





