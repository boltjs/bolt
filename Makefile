MFLAGS = -s
MAKEFLAGS = ${MFLAGS}

MODULE = bolt
VERSION = local

PROJECTS= \
	test \
	module \
	loader \
	kernel \
	inline \
	bootstrap \
	karma \
	compiler

PROJECT_DIR = projects

GEN = gen
DIST = ${GEN}/dist

TAR = ${DIST}/${MODULE}-${VERSION}.tar.gz
TAR_IMAGE = ${GEN}/image/${MODULE}-${VERSION}
TAR_VERSION = ${TAR_IMAGE}/bin/version
TAR_NPM = ${TAR_IMAGE}/package.json
TAR_NPM = ${TAR_IMAGE}/package.json

RELEASE_DIR = ${TAR_IMAGE}
RELEASE_FILES = LICENSE LICENSE.ephox CONTRIBUTORS COPYING README.md

CONFIG_NPM = config/npm/package.json
CONFIG_VERSION = config/release/version
CONFIG_BUILD = config/release/build

PUBLISH_REPO_URL = git@github.com:boltjs/dist.boltjs.io.git
PUBLISH_REPO = ${GEN}/dist.boltjs.io
PUBLISH_DIR = ${GEN}/dist.boltjs.io/${VERSION}
PUBLISH_GIT = git --work-tree ${PUBLISH_REPO} --git-dir ${PUBLISH_REPO}/.git
PUBLISH_ARTIFACTS = ${TAR} ${TAR_IMAGE}/lib/bolt.js ${TAR_IMAGE}/lib/bolt-karma.js

DIRECTORIES = ${GEN} ${DIST} ${TAR_IMAGE}

.PHONY: clean dist publish release ${PROJECTS} ${RELEASE_DIR} ${PUBLISH_DIR} ${PUBLISH_REPO}

default: clean ${RELEASE_DIR}

clean: ${PROJECTS_CLEAN}
	rm -rf ./${GEN}

dist: ${TAR}

release: clean
	if [ `npm whoami` != boltjs ]; then \
		echo 'Register  machine for release. Please use - User: "boltjs", Email: "dev@boltjs.io"' ; \
		npm adduser ; \
	fi
	expr `cat ${RELEASE_BUILD_FILE}` + 1 > ${RELEASE_BUILD_FILE}
	git commit -m "[release] Bump build number." ${RELEASE_BUILD_FILE}
	git push origin master
	${MAKE} ${MFLAGS} publish VERSION=`cat ${RELEASE_VERSION_FILE}`.`cat ${RELEASE_BUILD_FILE}`

publish: dist ${PUBLISH_REPO} ${PUBLISH_DIR}
	cp ${PUBLISH_ARTIFACTS} ${PUBLISH_DIR}
	${PUBLISH_GIT} add .
	${PUBLISH_GIT} commit -m "[release] ${V}"
	${PUBLISH_GIT}  push origin master
	${PUBLISH_GIT}  push -f origin master:gh-pages
	npm publish gen/image/bolt-${V}

${PROJECTS}:
	cd $@ && ${MAKE} ${MFLAGS} test

${TAR_NPM}: ${TAR_IMAGE_DIR}
	sed 's/__VERSION__/${VERSION}/g' ${CONFIG_NPM} > $@

${TAR_VERSION}: ${TAR_IMAGE_DIR}
	echo ${VERSION} > $@

${TAR_IMAGE}: clean ${TAR_IMAGE_DIR} ${PROJECTS} ${TAR_NPM} ${TAR_VERSION} ${RELEASE_FILES}
	cp ${PROJECTS_DIR}/*/gen/*.js ${TAR_IMAGE}/lib/.
	cp ${RELEASE_FILES} ${TAR_IMAGE}
	cp script/bin/* ${TAR_IMAGE}/bin/.
	cp script/command/* ${TAR_IMAGE}/command/.

${TAR}: ${TAR_IMAGE} ${DIST}
	tar cfz ${TAR} -C ${GEN}/image .

${DIRECTORIES}:
	mkdir -p $@

${PUBLISH_REPO}:
	[ ! -d gen/dist.boltjs.io ] || rm -rf gen/dist.boltjs.io
	git clone ${PUBLISH_REPO_URL} ${PUBLISH_REPO}

${PUBLISH_DIR}: ${PUBLISH_REPO}
	mkdir -p $@
