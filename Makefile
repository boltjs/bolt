NAME = loader
SRC = src
MODULES = \
	${SRC}/prelude.js
DIST = dist
RELEASE = ${DIST}/${NAME}.js
.PHONY = default clean

default: ${RELEASE}

clean:
	rm -rf ./${DIST}

${DIST}:
	mkdir -p $@

${RELEASE}: ${DIST} ${MODULES} ${DEPENDENCY}
	(echo "(function(global) {" && cat ${MODULES} && echo "})(this);") > ${RELEASE}
