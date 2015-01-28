## Sections

The `wercker.yml` file allows you to set up your wercker enviroment.

### Container

The box section allows you to choose a box which will be used to run the builds and deploys. This item will contain a single reference to the box. The box will be prefixed by the owner and it can be postfixed with a "@" followed by a version. If no version is given, then the latest version will be used.

### Services

The services section allow you to specify supporting boxes, like databases or queue servers. This item should contain an array of supporting boxes. The reference will be the same as to a main box. So it will be prefixed and can contain a version.

```yaml
    box: wercker/ruby
    services:
        - wercker/mongodb
        - wercker/rabbitmq
```

This will load two services, `mongodb` and `rabbitmq`, both owned by `wercker` and both using the latest versions.

### Build

The `build` section will contain all the configuration for the build pipeline.

### Deploy

The `deploy` section will contain all the configuration for the pipeline.

[&lsaquo; Syntax](/learn/wercker-yml/02_syntax.html "nav previous yml")
[Environment variables &rsaquo;](/learn/wercker-yml/04_environment-variables.html "nav next yml")
