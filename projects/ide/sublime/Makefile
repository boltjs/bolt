MFLAGS = -s
MAKEFLAGS = ${MFLAGS}

MODULE = bolt
VERSION = local

SRC = src
GEN = gen
DIST = ${GEN}/dist

PACKAGE = ${DIST}/${MODULE}-${VERSION}.sublime-package
PACKAGE_IMAGE = ${GEN}/image/${MODULE}-${VERSION}

DIRECTORIES = ${GEN} ${DIST}

.PHONY: clean dist test

default: clean test

clean:
	rm -rf ./${GEN}

dist: ${PACKAGE}

test: dist ${PACKAGE_IMAGE}
	(cd ${PACKAGE_IMAGE}/Bolt && python -B -m test.all_test)

${DIRECTORIES}:
	mkdir -p $@

${PACKAGE_IMAGE}:
	mkdir -p $@
	cp -R ${SRC}/* $@

${PACKAGE}: ${DIST} ${PACKAGE_IMAGE}
	(cd ${PACKAGE_IMAGE} && zip -q ../../../$@ -r .)
