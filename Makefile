MFLAGS = -s
MAKEFLAGS = ${MFLAGS}

MODULE = bolt
VERSION = local

PROJECTS= \
	base \
	loader \
	kernel \
	module \
	test \
	inline \
	bootstrap \
	karma \
	compiler

PROJECTS_DIR = projects

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
PUBLISH_DIR = ${PUBLISH_REPO}/${VERSION}
PUBLISH_GIT = git --work-tree ${PUBLISH_REPO} --git-dir ${PUBLISH_REPO}/.git
PUBLISH_ARTIFACTS = ${TAR} ${RELEASE_DIR}/lib/bolt.js ${RELEASE_DIR}/lib/bolt-karma.js

DIRECTORIES = ${GEN} ${DIST} ${TAR_IMAGE} ${RELEASE_DIR} ${RELEASE_DIR}/bin ${RELEASE_DIR}/lib ${RELEASE_DIR}/command

.PHONY: clean dist artifacts publish npm-register release ${PROJECTS} ${RELEASE_DIR} ${PUBLISH_DIR} ${PUBLISH_REPO}

default: clean artifacts

clean: ${PROJECTS_CLEAN}
	rm -rf ./${GEN}

dist: ${TAR}

artifacts: clean ${PROJECTS} ${RELEASE_NPM} ${RELEASE_VERSION} ${STATIC_ARTIFACTS} ${RELEASE_DIR}/bin ${RELEASE_DIR}/lib ${RELEASE_DIR}/command
	cp ${STATIC_ARTIFACTS} ${RELEASE_DIR}/.
	for x in ${PROJECTS}; do cp ${PROJECTS_DIR}/$$x/gen/* ${RELEASE_DIR}/lib/. ; done
	cp ${PROJECTS_DIR}/script/bin/* ${RELEASE_DIR}/bin/.
	cp ${PROJECTS_DIR}/script/command/* ${RELEASE_DIR}/command/.
	cp ${PROJECTS_DIR}/script/lib/* ${RELEASE_DIR}/lib/.

release: clean
	expr `cat ${CONFIG_BUILD}` + 1 > ${CONFIG_BUILD}
	git commit -m "[release] Bump build number [`cat ${CONFIG_VERSION}`-`cat ${CONFIG_BUILD}`]." ${CONFIG_BUILD}
	git push origin master
	${MAKE} ${MFLAGS} publish VERSION=`cat ${CONFIG_VERSION}`-`cat ${CONFIG_BUILD}`

publish: npm-register artifacts ${TAR} ${RELEASE_DIR} ${PUBLISH_REPO} ${PUBLISH_DIR}
	cp ${PUBLISH_ARTIFACTS} ${PUBLISH_DIR}
	${PUBLISH_GIT} add .
	${PUBLISH_GIT} commit -m "[release] ${VERSION}"
	${PUBLISH_GIT} push origin master
	${PUBLISH_GIT} push -f origin master:gh-pages
	npm publish ${RELEASE_DIR}

npm-register:
	if [ "`npm whoami`" != "boltjs" ]; then \
		echo 'Register machine for release. Please use - User: "boltjs", Email: "dev@boltjs.io"' ; \
		npm adduser ; \
	fi

${PROJECTS}:
	cd ${PROJECTS_DIR}/$@ && ${MAKE} ${MFLAGS} test

${RELEASE_NPM}: ${RELEASE_DIR}
	sed 's/__VERSION__/${VERSION}/g' ${CONFIG_NPM} > $@

${RELEASE_VERSION}: ${RELEASE_DIR}/bin
	echo ${VERSION} > $@

${TAR}: artifacts ${DIST}
	tar cfz ${TAR} -C ${TAR_IMAGE} .

${DIRECTORIES}:
	mkdir -p $@

${PUBLISH_REPO}:
	[ ! -d ${PUBLISH_REPO} ] || rm -rf ${PUBLISH_REPO}
	git clone ${PUBLISH_REPO_URL} ${PUBLISH_REPO}

${PUBLISH_DIR}: ${PUBLISH_REPO}
	mkdir -p $@
