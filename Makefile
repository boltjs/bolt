MODULE = bolt
VERSION = local
PROJECTS= \
	test \
	script \
	module \
	loader \
	kernel \
	inline \
	compiler
SRC = \
	test/gen/test.js \
	module/gen/module.js \
	loader/gen/loader.js \
	kernel/gen/kernel.js \
	inline/gen/inline.js \
	inline/gen/inline.js.pre \
	inline/gen/inline.js.post \
	compiler/gen/compiler.js \
	script/src/bolt \
	script/src/bolt-init.subr \
	script/src/bolt-build.subr \
	script/src/bolt-test.subr \
	script/src/bolt-test.js \
	script/src/jsc \
	script/src/jsc.js
GEN = gen
DIST = ${GEN}/dist
TAR = ${DIST}/${MODULE}-${VERSION}.tar.gz
TAR_IMAGE = ${GEN}/image/${MODULE}-${VERSION}
VERSION_FILE = ${TAR_IMAGE}/bin/version
DIRECTORIES = ${GEN} ${GEN}/tmp ${DIST} ${TAR_IMAGE} ${TAR_IMAGE}/bin
MFLAGS =

.PHONY: clean dist

default: dist

dist: ${TAR}

cleandist: clean dist

${VERSION_FILE}: ${TAR_IMAGE}
	echo ${VERSION} > ${VERSION_FILE}

${TAR}: ${DIST} ${TAR_IMAGE}/bin ${VERSION_FILE} ${SRC}
	cp ${SRC} ${TAR_IMAGE}/bin
	tar cfz ${TAR} -C ${GEN}/image .

${SRC}:
	(cd `echo $@ | xargs dirname | xargs dirname` && ${MAKE} $(MFLAGS))

${DIRECTORIES}:
	mkdir -p $@

clean:
	rm -rf ./${GEN}


