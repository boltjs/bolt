include modules.in

MFLAGS = -s

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
	if [ ! -z "${MODULES}" ] && [ -d "${TEST}" ]; then find ${TEST} -type f -name \*test.js -print0 | xargs -0 -n 1 sh -c 'test=$$0; echo $$test; node $$test'; fi

${DIST}:
	mkdir -p $@

${PRELUDE}: ../framework/components/prelude.js
	mkdir -p lib/framework
	cp ../framework/components/prelude.js lib/framework

${ASSERT}: ../framework/components/assert.js
	mkdir -p lib/framework
	cp ../framework/components/assert.js lib/framework

${DISTFILES}:
	cd `echo $@ | xargs dirname | xargs dirname` && ${MAKE} $(MFLAGS) dist

${RELEASE}: ${DIST} ${MODULES} ${DEPENDENCIES} ${PRELUDE} modules.in
	if [ ! -z "${MODULES}" ]; then ( \
	echo "(function (scope) {" && \
	cat ${PRELUDE} ${MODULES} && \
	echo "})(Function('return this')());" \
	) > ${RELEASE}; fi
