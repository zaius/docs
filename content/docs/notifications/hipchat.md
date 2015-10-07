## Hipchat notifications

Wercker can send notifications on build or deploy events to your [HipChat](http://hipchat.com) channel.

For notifications we leverage [after-steps](/docs/steps/after-steps.html) that
are executed when a build or deploy finishes.

Various notifications for HipChat exist in the [step registry](https://app.wercker.com/#explore/steps),
but below we showcase how to use one that wercker has created.

You define after-steps in your [wercker.yml](/docs/wercker-yml/creating-a-yml.html)
either in your `build` or `deploy` pipeline (or both!).

```yaml
  after-steps:
    - hipchat-notify:
        token: $HIPCHAT_TOKEN
        room-id: id
```

### Tokens

To be able to post notifications you need a V2 OAuth token. You can get these on
the HipChat settings page of a [user](https://hipchat.com/account/api).
This username will be used when posting notifications.

> We encourage to create a separate room for your notifications

### Options

| Name | Options | Description |
|:-----|:--------|:------------|
| `token` | (required) | Your HipChat token (retrieve yours from https://hipchat.com/account/api) |
| `room-id` | (required) | The id of the HipChat room (retrieve yours from https://www.hipchat.com/rooms/ids). |
| `passed-message` | (optional) | The message which will be shown on a passed build or deploy. |
| `failed-message` | (optional) | The message which will be shown on a failed build or deploy. |
| `passed-color` | (optional, default: `green`) | The color of a passed build/deploy message in HipChat. |
| `failed-color` | (optional, default: `red`) | The color of a failed build/deploy message in HipChat. |
| `passed-notify` | (optional, default: `false`) | If this is `true` the passed build/deploy message will make HipChat notify the user. |
| `failed-notify` | (optional, default: `true`) | If this is `true` the passed build/deploy message will make HipChat notify the user. |
| `from-name` | (optional, default: `wercker`) | Use this option to override the name that will appear in the room as sender. |
| `on` | (optional, default: `always`) | When should this step send a message. Possible values: `always` and `failed`. |
| `message-format` | (optional, default: `html`) | Send the notification in `html` or `text` message format. `html` message format support links, but does not support emoticons. `text`message format supports emoticons, but does not support links. |

