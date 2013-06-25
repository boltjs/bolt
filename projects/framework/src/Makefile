include modules.in

MFLAGS = -s
MAKEFLAGS = ${MFLAGS}

SRC = src
LIB = lib
TEST = test
DIST = gen
RELEASE = ${DIST}/${NAME}.js
PRELUDE = ${LIB}/framework/prelude.js
ASSERT = ${LIB}/framework/assert.js

.PHONY: default clean test dist

default: test

dist: ${RELEASE} ${DISTFILES}
	if [ ! -z "${DISTFILES}" ]; then cp ${DISTFILES} ${DIST}; fi

clean:
	rm -rf ./${DIST}

test: dist ${ASSERT}
	if [ ! -z "${MODULES}" ] && [ -d "${TEST}" ]; then find ${TEST} -type f -iname \*test.js -print0 | xargs -0 -n 1 sh -c 'test=$$0; echo $$test; node $$test'; fi

${DIST}:
	mkdir -p $@

${PRELUDE}: ../framework/src/prelude.js
	mkdir -p lib/framework
	cp ../framework/src/prelude.js lib/framework

${ASSERT}: ../framework/src/assert.js
	mkdir -p lib/framework
	cp ../framework/src/assert.js lib/framework

${DISTFILES}:
	cd `echo $@ | xargs dirname | xargs dirname` && ${MAKE} $(MFLAGS) dist

${RELEASE}: ${DIST} ${MODULES} ${DEPENDENCIES} ${PRELUDE} modules.in
	if [ ! -z "${MODULES}" ]; then ( \
	echo "(function (scope) {" && \
	cat ${PRELUDE} ${MODULES} && \
	echo "})(Function('return this')());" \
	) > ${RELEASE}; fi
