SRC = index.js
PORT = 1337

all: build open

build:
	npm install
	@NODE_ENV=development PORT=$(PORT) node_modules/.bin/gulp \
		build

watch:
	@NODE_ENV=development PORT=$(PORT) node_modules/.bin/gulp

clean:
	npm prune
	rm -rf build cache releases coverage

open:
	open http://localhost:$(PORT)
	NODE_ENV=development node_modules/.bin/httpster \
		-d build/ \
		-p $(PORT)

.PHONY: test build
