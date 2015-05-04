PORT = 1337

all: build open

build:
	node_modules/.bin/gulp build

content:
	node_modules/.bin/gulp content

watch:
	node_modules/.bin/gulp

serve:
	node_modules/.bin/httpster -d build/ -p $(PORT)

clean:
	rm -rf build cache releases coverage

open:
	open http://localhost:$(PORT)
	node_modules/.bin/httpster -d build/ -p $(PORT)

.PHONY: all build content watch serve clean open
