SRC = src

SCRATCH = scratch
SCRATCH_ZIP = ${SCRATCH}/zip
SCRATCH_DIST = ${SCRATCH}/dist

DEPLOY = dist/deploy

ZIP = ${SCRATCH_DIST}/Bolt.sublime-package

.PHONY: clean dist 

default: clean dist

clean:
	rm -rf ./${SCRATCH}

${SCRATCH}:
	mkdir -p $@ ${SCRATCH_ZIP} ${SCRATCH_DIST}

dist: ${SCRATCH}
	cp -R ${SRC}/* ${SCRATCH_ZIP} && \
	(cd ${SCRATCH_ZIP} && zip -q ../../${ZIP} -r .)

