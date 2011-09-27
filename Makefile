NAME = loader
SRC = src
TEST = test
MODULES = \
	${SRC}/prelude.js \
	${SRC}/transport/xhr.js \
	${SRC}/execution/eval.js \
	${SRC}/execution/injector.js \
	${SRC}/loader/script.js \
	${SRC}/loader/xhreval.js \
	${SRC}/loader/xhrinjector.js
DIST = dist
RELEASE = ${DIST}/${NAME}.js

.PHONY: default clean test

default: ${RELEASE}

clean:
	rm -rf ./${DIST}

test:
	find ${TEST} -type f -name \*test.js -print0 | xargs -0 -n 1 node

${DIST}:
	mkdir -p $@

${RELEASE}: ${DIST} ${MODULES} ${DEPENDENCY}
	(echo "(function(global) {" && cat ${MODULES} && echo "})(this);") > ${RELEASE}
