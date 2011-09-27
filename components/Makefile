include modules.in

SRC = src
LIB = lib
TEST = test
DIST = gen
RELEASE = ${DIST}/${NAME}.js
PRELUDE = ${LIB}/framework/prelude.js 

.PHONY: default clean test

default: ${RELEASE} test

clean:
	rm -rf ./${DIST}

test:
	find ${TEST} -type f -name \*test.js -print0 | xargs -0 -n 1 node

${DIST}:
	mkdir -p $@

${PRELUDE}:
	dent -clean

${RELEASE}: ${DIST} ${MODULES} ${DEPENDENCY} ${PRELUDE}
	(echo "(function(global) {" && cat ${PRELUDE} ${MODULES} && echo "})(this);") > ${RELEASE}

