include modules.in

MFLAGS = -s
MAKEFLAGS = ${MFLAGS}

SRC = src
WRAP = wrap
LIB = lib
TEST = test
DIST = gen/dist
MODULES_RELEASE = ${DIST}/${NAME}.modules.js
WRAPPED_RELEASE = ${DIST}/${NAME}.js

.PHONY: default clean test dist build

default: test

dist: build ${DISTFILES}
	if [ ! -z "${DISTFILES}" ]; then cp ${DISTFILES} ${DIST}; fi

clean:
	rm -rf ./${DIST}

test: dist
	if [ ! -z "${MODULES}" ] && [ -d "${TEST}" ]; then \
	    find ${TEST} -type f -iname \*test.js -print0 | xargs -0 -n 1 sh -c 'test=$$0; echo $$test; node $$test'; \
	fi

${DIST}:
	mkdir -p $@

${DISTFILES}:
	cd `echo $@ | xargs dirname | xargs dirname` && ${MAKE} $(MFLAGS) dist

build: ${DIST} ${MODULES} modules.in
	if [ ! -z "${MODULES}" ]; then \
	    cat  ${MODULES} > ${MODULES_RELEASE} ; \
	fi
	if [ ! -z "${WRAPPED}" ]; then \
	    cat  ${WRAPPED} > ${WRAPPED_RELEASE} ; \
	fi
