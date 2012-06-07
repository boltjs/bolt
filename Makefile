MODULE = bolt
VERSION = local
REPOSITORY_PATH=repo
GIT_BASE=https://github.com/ephox/bolt-
#GIT_BASE=git@git:bolt/
#GIT_BASE=git://git/bolt/
REPOSITORIES= \
	${REPOSITORY_PATH}/test \
	${REPOSITORY_PATH}/script \
	${REPOSITORY_PATH}/module \
	${REPOSITORY_PATH}/loader \
	${REPOSITORY_PATH}/kernel \
	${REPOSITORY_PATH}/inline \
	${REPOSITORY_PATH}/framework \
	${REPOSITORY_PATH}/compiler
MAKEFILES= \
	${REPOSITORY_PATH}/test/Makefile \
	${REPOSITORY_PATH}/module/Makefile \
	${REPOSITORY_PATH}/loader/Makefile \
	${REPOSITORY_PATH}/kernel/Makefile \
	${REPOSITORY_PATH}/inline/Makefile \
	${REPOSITORY_PATH}/compiler/Makefile
SRC = \
	${REPOSITORY_PATH}/test/gen/test.js \
	${REPOSITORY_PATH}/module/gen/module.js \
	${REPOSITORY_PATH}/loader/gen/loader.js \
	${REPOSITORY_PATH}/kernel/gen/kernel.js \
	${REPOSITORY_PATH}/inline/gen/inline.js \
	${REPOSITORY_PATH}/compiler/gen/compiler.js \
	${REPOSITORY_PATH}/script/src/bolt \
	${REPOSITORY_PATH}/script/src/bolt-init.subr \
	${REPOSITORY_PATH}/script/src/bolt-build.subr \
	${REPOSITORY_PATH}/script/src/bolt-test.subr \
	${REPOSITORY_PATH}/script/src/bolt-test.js \
	${REPOSITORY_PATH}/script/src/jsc \
	${REPOSITORY_PATH}/script/src/jsc.js
GEN = gen
DIST = ${GEN}/dist
TAR = ${DIST}/${MODULE}-${VERSION}.tar.gz
TAR_IMAGE = ${GEN}/image/${MODULE}-${VERSION}
VERSION_FILE = ${TAR_IMAGE}/bin/version
DIRECTORIES = ${GEN} ${GEN}/tmp ${DIST} ${TAR_IMAGE} ${TAR_IMAGE}/bin
EXECUTE_BIT = ${TAR_IMAGE}/bin/jsc ${TAR_IMAGE}/bin/bolt
MFLAGS = -s

.PHONY: clean dist pull

default: dist

dist: ${TAR}

cleandist: clean dist

pull:
	for x in ${REPOSITORIES}; do \
		(cd $$x && git pull) \
	done

${VERSION_FILE}: ${TAR_IMAGE}
	echo ${VERSION} > ${VERSION_FILE}

${TAR}: ${DIST} ${TAR_IMAGE}/bin ${VERSION_FILE} ${SRC}
	cp ${SRC} ${TAR_IMAGE}/bin
	chmod +x ${EXECUTE_BIT}
	tar cfz ${TAR} -C ${GEN}/image .

${REPOSITORY_PATH}/inline/gen/inline.js: ${REPOSITORY_PATH}/inline/Makefile
	cd ${REPOSITORY_PATH}/inline; ${MAKE} ${MFLAGS}

${REPOSITORY_PATH}/test/gen/test.js: ${REPOSITORY_PATH}/test/Makefile
	cd ${REPOSITORY_PATH}/test; ${MAKE} ${MFLAGS}

${REPOSITORY_PATH}/kernel/gen/kernel.js: ${REPOSITORY_PATH}/kernel/Makefile
	cd ${REPOSITORY_PATH}/kernel; ${MAKE} ${MFLAGS}

${REPOSITORY_PATH}/loader/gen/loader.js: ${REPOSITORY_PATH}/loader/Makefile
	cd ${REPOSITORY_PATH}/loader; ${MAKE} ${MFLAGS}

${REPOSITORY_PATH}/module/gen/module.js ${REPOSITORY_PATH}/module/gen/loader.js ${REPOSITORY_PATH}/module/gen/kernel.js: ${REPOSITORY_PATH}/loader/gen/loader.js ${REPOSITORY_PATH}/kernel/gen/kernel.js ${REPOSITORY_PATH}/module/Makefile
	mkdir -p ${REPOSITORY_PATH}/module/lib/loader ${REPOSITORY_PATH}/module/lib/kernel
	cp ${REPOSITORY_PATH}/loader/gen/loader.js ${REPOSITORY_PATH}/module/lib/loader
	cp ${REPOSITORY_PATH}/kernel/gen/kernel.js ${REPOSITORY_PATH}/module/lib/kernel
	cd ${REPOSITORY_PATH}/module; ${MAKE} ${MFLAGS}

${REPOSITORY_PATH}/compiler/gen/compiler.js: ${REPOSITORY_PATH}/module/gen/module.js ${REPOSITORY_PATH}/module/gen/loader.js ${REPOSITORY_PATH}/module/gen/kernel.js ${REPOSITORY_PATH}/inline/gen/inline.js ${REPOSITORY_PATH}/compiler/Makefile
	mkdir -p ${REPOSITORY_PATH}/compiler/lib/inline ${REPOSITORY_PATH}/compiler/lib/module
	cp ${REPOSITORY_PATH}/module/gen/loader.js ${REPOSITORY_PATH}/compiler/lib/module
	cp ${REPOSITORY_PATH}/module/gen/kernel.js ${REPOSITORY_PATH}/compiler/lib/module
	cp ${REPOSITORY_PATH}/module/gen/module.js ${REPOSITORY_PATH}/compiler/lib/module
	cp ${REPOSITORY_PATH}/inline/gen/inline.js ${REPOSITORY_PATH}/compiler/lib/inline
	cd ${REPOSITORY_PATH}/compiler; ${MAKE} $(MFLAGS)

${REPOSITORY_PATH}/framework/components/Makefile: ${REPOSITORIES}

${MAKEFILES}: ${REPOSITORY_PATH}/framework/components/Makefile
	cp ${REPOSITORY_PATH}/framework/components/Makefile  $@

${REPOSITORIES}:
	git clone ${GIT_BASE}`basename $@` $@

${DIRECTORIES}:
	mkdir -p $@

clean:
	rm -rf ./${GEN} ./${REPOSITORY_PATH}


