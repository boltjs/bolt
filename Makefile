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
TAR_IMAGE = ${GEN}/image

STATIC_ARTIFACTS = LICENSE LICENSE.ephox CONTRIBUTORS COPYING README.md

RELEASE_DIR = ${TAR_IMAGE}/${MODULE}-${VERSION}
RELEASE_NPM = ${RELEASE_DIR}/package.json
RELEASE_VERSION = ${RELEASE_DIR}/bin/version

CONFIG_NPM = config/npm/package.json
CONFIG_VERSION = config/release/version
CONFIG_BUILD = config/release/build

PUBLISH_REPO_URL = git@github.com:boltjs/dist.boltjs.io.git
PUBLISH_REPO = ${GEN}/dist.boltjs.io
PUBLISH_DIR = ${GEN}/dist.boltjs.io/${VERSION}
PUBLISH_GIT = git --work-tree ${PUBLISH_REPO} --git-dir ${PUBLISH_REPO}/.git
PUBLISH_ARTIFACTS = ${TAR} ${RELEASE_DIR}/lib/bolt.js ${RELEASE_DIR}/lib/bolt-karma.js

DIRECTORIES = ${GEN} ${DIST} ${TAR_IMAGE} ${RELEASE_DIR}

.PHONY: clean dist artifacts publish npm-register release ${PROJECTS} ${RELEASE_DIR} ${PUBLISH_DIR} ${PUBLISH_REPO}

default: clean ${RELEASE_DIR}

clean: ${PROJECTS_CLEAN}
	rm -rf ./${GEN}

dist: ${TAR}

artifacts: clean ${PROJECTS} ${RELEASE_NPM} ${RELEASE_VERSION} ${RELEASE_DIR} ${STATIC_ARTIFACTS}
	cp ${STATIC_ARTIFACTS} ${RELEASE_DIR}
	cp ${PROJECTS_DIR}/*/gen/*.js ${RELEASE_DIR}/lib/.
	cp ${PROJECTS_DIR}/script/bin/* ${RELEASE_DIR}/bin/.
	cp ${PROJECTS_DIR}/script/command/* ${RELEASE_DIR}/command/.

release: clean
	expr `cat ${RELEASE_BUILD_FILE}` + 1 > ${RELEASE_BUILD_FILE}
	git commit -m "[release] Bump build number." ${RELEASE_BUILD_FILE}
	git push origin master
	${MAKE} ${MFLAGS} publish VERSION=`cat ${RELEASE_VERSION_FILE}`.`cat ${RELEASE_BUILD_FILE}`

publish: npm-register artifacts ${TAR} ${RELEASE_DIR} ${PUBLISH_REPO} ${PUBLISH_DIR}
	cp ${PUBLISH_ARTIFACTS} ${PUBLISH_DIR}
	${PUBLISH_GIT} add .
	${PUBLISH_GIT} commit -m "[release] ${VERSION}"
	${PUBLISH_GIT} push origin master
	${PUBLISH_GIT} push -f origin master:gh-pages
	npm publish ${RELEASE_DIR}

npm-register:
	if [ `npm whoami` != boltjs ]; then \
		echo 'Register  machine for release. Please use - User: "boltjs", Email: "dev@boltjs.io"' ; \
		npm adduser ; \
	fi

${PROJECTS}:
	cd $@ && ${MAKE} ${MFLAGS} test

${RELEASE_NPM}: ${RELEASE_DIR}
	sed 's/__VERSION__/${VERSION}/g' ${CONFIG_NPM} > $@

${RELEASE_VERSION}: ${RELEASE_DIR}
	echo ${VERSION} > $@

${TAR}: artifacts ${DIST}
	tar cfz ${TAR} -C ${TAR_IMAGE} .

${DIRECTORIES}:
	mkdir -p $@

${PUBLISH_REPO}:
	[ ! -d gen/dist.boltjs.io ] || rm -rf gen/dist.boltjs.io
	git clone ${PUBLISH_REPO_URL} ${PUBLISH_REPO}

${PUBLISH_DIR}: ${PUBLISH_REPO}
	mkdir -p $@
