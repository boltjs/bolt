include modules.in

SRC = src
LIB = lib
TEST = test
DIST = gen
RELEASE = ${DIST}/${NAME}.js
PRELUDE = ${LIB}/framework/prelude.js 

.PHONY: default clean test

default: dist test

dist: ${RELEASE} ${DISTFILES}
	if [ ! -z "${DISTFILES}" ]; then cp ${DISTFILES} ${DIST}; fi

clean:
	rm -rf ./${DIST}

test: ${RELEASE}
	find ${TEST} -type f -name \*test.js | while read x; do echo "$$x"; node $$x | sed -e 's/^/  /'; done

${DIST}:
	mkdir -p $@

${PRELUDE}:
	dent -clean

${RELEASE}: ${DIST} ${MODULES} ${DEPENDENCY} ${PRELUDE} ${POSTSCOPE} modules.in
	( \
	echo "(function(scope) {" && \
	cat ${PRELUDE} ${MODULES} && \
	echo "})(this.window || global);" && \
	if [ ! -z "${POSTSCOPE}" ]; then cat ${POSTSCOPE}; fi \
	) > ${RELEASE}
