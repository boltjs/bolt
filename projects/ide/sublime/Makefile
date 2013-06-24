SRC = src
DOC = doc

SCRATCH = scratch
SCRATCH_ZIP = ${SCRATCH}/zip
SCRATCH_DIST = ${SCRATCH}/dist
SCRATCH_UPLOAD = ${SCRATCH}/upload/`cat ${DEPLOY}/version.properties | cut -d '=' -f 2`

DEPLOY = dist/deploy

ZIP = ${SCRATCH_DIST}/Bolt.sublime-package

.PHONY: clean dist upload

default: clean dist

clean:
	rm -rf ./${SCRATCH}

${SCRATCH}:
	mkdir -p $@ ${SCRATCH_ZIP} ${SCRATCH_DIST}

dist: ${SCRATCH}
	cp -R ${SRC}/* ${SCRATCH_ZIP} && \
	(cd ${SCRATCH_ZIP} && zip -q ../../${ZIP} -r .)

upload:
	mkdir -p ${SCRATCH_UPLOAD}
	cp ${ZIP} ${SCRATCH_UPLOAD}
