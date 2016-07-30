OUTPUT_PATH=node_modules
JS_FILES=src test

all: clean test jshint jscs

include js.mk

clean:
	rm -rf $(OUTPUT_PATH)

build:  $(JS_SENTINAL)
	npm install

test: build
	npm test

