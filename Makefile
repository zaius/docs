PORT = 1337

all: build open

build:
	node_modules/.bin/gulp build

watch:
	node_modules/.bin/gulp

clean:
	rm -rf build cache releases coverage

open:
	open http://localhost:$(PORT)
	node_modules/.bin/httpster -d build/ -p $(PORT)

.PHONY: all build watch clean open
