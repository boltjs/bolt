MODULE = bolt
VERSION = local
GEN = gen
SRC = components
DIST = ${GEN}/dist
TAR = ${DIST}/${MODULE}-${VERSION}.tar.gz
ZIP = ${DIST}/${MODULE}-${VERSION}.zip
TAR_IMAGE = ${GEN}/image/${MODULE}-${VERSION}
VERSION_FILE = ${TAR_IMAGE}/bin/version
DIRECTORIES = ${GEN} ${GEN}/tmp ${DIST} ${TAR_IMAGE} ${TAR_IMAGE}/bin
EXECUTE_BIT = ${TAR_IMAGE}/bin/jsc ${TAR_IMAGE}/bin/bolt

.PHONY: clean dist prepare

default: clean dist

dist: ${TAR} ${ZIP}
	cp ${TAR_IMAGE}/bin/* ${DIST} # this is temporary only for ephoxtools compat, kill once ephoxtools is removed.

${VERSION_FILE}: ${TAR_IMAGE}/bin
	echo ${VERSION} > ${VERSION_FILE}

prepare: ${TAR_IMAGE}/bin ${VERSION_FILE}
	cp ${SRC}/* ${TAR_IMAGE}/bin
	chmod +x ${EXECUTE_BIT}

${TAR}: prepare ${DIST}
	tar cfz ${TAR} -C ${GEN}/image .

${ZIP}: prepare ${DIST}
	(cd ${GEN}/image && zip -q ../../${ZIP} -r .)

${DIRECTORIES}:
	mkdir -p $@

clean:
	rm -rf ./${GEN}
