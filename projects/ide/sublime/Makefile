MFLAGS = -s
MAKEFLAGS = ${MFLAGS}

MODULE = bolt-sublime
VERSION = local

SRC = src

GEN = gen
DIST = ${GEN}/dist

ZIP = ${DIST}/${MODULE}-${VERSION}.sublime-package
ZIP_IMAGE = ${GEN}/image/${MODULE}-${VERSION}

DIRECTORIES = ${GEN} ${DIST}

.PHONY: clean dist test

default: clean dist test

clean:
	rm -rf ./${GEN}

dist: ${ZIP}

test:
	(cd src/Bolt && python -m test.all_test)

${DIRECTORIES}:
	mkdir -p $@

${ZIP_IMAGE}:
	mkdir -p $@
	cp -R ${SRC}/* $@

${ZIP}: ${DIST} ${ZIP_IMAGE}
	(cd ${ZIP_IMAGE} && zip -q ../../../$@ -r .)
