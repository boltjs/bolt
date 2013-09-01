MFLAGS = -s
MAKEFLAGS = ${MFLAGS}

MODULE = bolt-sublime
VERSION = local

PACKAGE_NAME = Bolt

SRC = src

GEN = gen
DIST = ${GEN}/dist

TAR = ${DIST}/${MODULE}-${VERSION}.tar.gz
TAR_IMAGE = ${GEN}/package

PACKAGE_DIR = ${TAR_IMAGE}/${MODULE}-${VERSION}
PACKAGE = ${PACKAGE_DIR}/${PACKAGE_NAME}.sublime-package
PACKAGE_IMAGE = ${GEN}/image/${MODULE}-${VERSION}

DIRECTORIES = ${GEN} ${DIST} ${TAR_IMAGE} ${PACKAGE_DIR}

.PHONY: clean dist test

default: clean dist test

clean:
	rm -rf ./${GEN}

dist: ${TAR}

test:
	(cd src/Bolt && python -m test.all_test)

${DIRECTORIES}:
	mkdir -p $@

${TAR}: ${DIST} ${PACKAGE}
	tar cfz $@ -C ${TAR_IMAGE} .

${PACKAGE_IMAGE}:
	mkdir -p $@
	cp -R ${SRC}/* $@

${PACKAGE}: ${PACKAGE_DIR} ${PACKAGE_IMAGE}
	(cd ${PACKAGE_IMAGE} && zip -q ../../../$@ -r .)
