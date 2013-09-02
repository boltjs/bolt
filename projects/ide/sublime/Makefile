MFLAGS = -s
MAKEFLAGS = ${MFLAGS}

MODULE = bolt-sublime
VERSION = local

SRC = src
GEN = gen
DIST = ${GEN}/dist

ZIP = ${DIST}/${MODULE}-channel-${VERSION}.zip
TAR = ${DIST}/${MODULE}-${VERSION}.tar.gz
TAR_IMAGE = ${GEN}/package

PACKAGE_NAME = Bolt
PACKAGE_DIR = ${TAR_IMAGE}/${MODULE}-${VERSION}
PACKAGE = ${PACKAGE_DIR}/${PACKAGE_NAME}.sublime-package
PACKAGE_IMAGE = ${GEN}/image/${MODULE}-${VERSION}

DIRECTORIES = ${GEN} ${DIST} ${TAR_IMAGE} ${PACKAGE_DIR}

.PHONY: clean dist test

default: clean test

clean:
	rm -rf ./${GEN}

dist: ${TAR} ${ZIP}

test: dist ${PACKAGE_IMAGE}
	(cd ${PACKAGE_IMAGE}/Bolt && python -m test.all_test)

${DIRECTORIES}:
	mkdir -p $@

${TAR}: ${DIST} ${PACKAGE}
	tar cfz $@ -C ${TAR_IMAGE} .

${ZIP}: ${DIST} ${PACKAGE_IMAGE}
	(cd ${PACKAGE_IMAGE} && zip -q ../../../$@ -r .)

${PACKAGE_IMAGE}:
	mkdir -p $@
	cp -R ${SRC}/* $@

${PACKAGE}: ${PACKAGE_DIR} ${PACKAGE_IMAGE}
	(cd ${PACKAGE_IMAGE} && zip -q ../../../$@ -r .)
