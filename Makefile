NAME = kernel
SRC = src
MODULES = \
	${SRC}/header.js \
	${SRC}/footer.js
DIST = dist
RELEASE = ${DIST}/${NAME}.js
.PHONY = default clean

default: ${RELEASE}

clean:
	rm -rf ./${DIST}

${DIST}:
	mkdir -p $@

${RELEASE}: ${DIST} ${MODULES} ${DEPENDENCY}
	cat ${MODULES} > ${RELEASE}
