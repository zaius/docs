## Using wercker cache

#### CACHE IS ONLY AVAILABLE FOR WERCKER CLASSIC

A cache directory is shared between builds. The path to this directory is stored
in the environment variable `$WERCKER_CACHE_DIR`. A step can leverage this cache
to share assets between builds.

A good example of this is the
[bundler-install](https://app.wercker.com/#applications/51c829d13179be44780020be/tab/details)
step which leverages the cache to shorten the installation time of dependencies.
It does so by storing the end-result of downloading and compiling dependend packages.

Future builds can use this as a starting point and only new dependencies which
were not cached are downloaded. At the start of every build the cache directory
is filled with the cached content from the last successful build, if not older than 14 days (and is < 1GB).

A step should not depend on content of the cache and should be able to handle
scenarios where the cache is not populated.

Here is a simple example of a step that leverages the cache:

```bash
if [ -f "$WERCKER_CACHE_DIR/mystep/a-dependency.bin" ]; then
    debug "a-dependency.bin found in cache"
else
    debug "tool.rar not found in cache, will download"
    curl -o "$WERCKER_CACHE_DIR/mystep/a-dependency.bin" "http://example.com/a-dependency.bin"
fi
```

This example checks for the file `$WERCKER_CACHE_DIR/mystep/a-dependency.bin`
from the cache. If the file is not found, it will be downloaded to the cache
directory so it will be available for future builds, if the build succeeds.
