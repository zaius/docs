---
tags: "example"
---

## Always start with a h2

The paragraph folowing the h2 is for giving a short summary of what the article
is about. It looks different then the following paragraphs.
And if you must put a `code snippit` in the introduction or a [link with title](http://www.wercker.com  "Wercker's Homepage").

### Table of content

* do not put `code snipppits` in headers
* do not link from here to a section
* do not try to use hairlines please

### Now actually start the article already

You can add `code snippits` in paragraphs and adding a link in results in this [link with title](http://www.wercker.com  "Wercker's Homepage").

#### This is a sub paragraph / section

In this case we want to show a code block, put the syntax type directly after the backticks.
Like in this example with the yaml.

```yaml
box: wercker/ruby
services:
    - mies/rethinkdb
build:
    steps:
        - script:
            name: middleman build
            code: bundle exec middleman build --verbose
deploy:
    steps:
        # Execute the s3sync deploy step, a step provided by wercker
        - s3sync:
            key_id: $AWS_ACCESS_KEY_ID
            key_secret: $AWS_SECRET_ACCESS_KEY
            bucket_url: $AWS_BUCKET_URL
            source_dir: build/
```

### We start a new section with a h3

If you want to emphasis something use this **double asterisks** or *single asterisks* write up.

> I'm trying to say somthing damn interesting here, did you notice?

Nullam molestie lectus tellus, vitae convallis ligula pellentesque ut. Morbi egestas quis nibh in cursus. Etiam eget velit vel velit venenatis porttitor in non velit. Etiam varius dui quam, et fringilla libero tempus non. Suspendisse potenti.

##### We even support a h5 but no more then that

Nullam molestie lectus tellus, vitae convallis ligula pellentesque ut. Morbi egestas quis nibh in cursus. Etiam eget velit vel velit venenatis porttitor in non velit. Etiam varius dui quam, et fringilla libero tempus non. Suspendisse potenti.

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

### Lets continue with a h3

Sed euismod ante at diam cursus, quis facilisis sem pharetra. Etiam varius nisi sapien, non efficitur nulla mollis dictum. Donec egestas et odio in consequat.

![image](/images/example-image.png)

Sed id tellus quis diam commodo semper ut ac felis. Aenean aliquet pellentesque diam, molestie viverra quam imperdiet porttitor. Nulla lacinia, orci a vulputate dictum, metus justo cursus ante, eu rhoncus sapien urna eu tortor. Nullam molestie lectus tellus, vitae convallis ligula pellentesque ut. Morbi egestas quis nibh in cursus.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |

Etiam eget velit vel velit venenatis porttitor in non velit. Etiam varius dui quam, et fringilla libero tempus non. Suspendisse potenti.
