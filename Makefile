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
GEN = gen
DIST = ${GEN}/dist
TAR = ${DIST}/${MODULE}-${VERSION}.tar.gz
TAR_IMAGE = ${GEN}/image/${MODULE}-${VERSION}
INSTALLER = ${GEN}/installer
CONFIG_WXS = config/wix/${MODULE}.wxs
WXS = ${INSTALLER}/${MODULE}.wxs
BUILD_MSI = ${INSTALLER}/build_msi.bat
VERSION_FILE = ${TAR_IMAGE}/bin/version
DIRECTORIES = ${GEN} ${GEN}/tmp ${DIST} ${TAR_IMAGE} ${TAR_IMAGE}/bin ${TAR_IMAGE}/command ${TAR_IMAGE}/lib ${INSTALLER}
RELEASE_VERSION_FILE = config/release/version
RELEASE_BUILD_FILE = config/release/build
MFLAGS = -s


.PHONY: clean dist distwindows projects browser release

default: clean projects

dist: clean ${TAR}

distwindows: ${TAR} ${WXS} ${BUILD_MSI}

${VERSION_FILE}: ${TAR_IMAGE}
	echo ${VERSION} > ${VERSION_FILE}

projects: ${DIST} ${TAR_IMAGE}/bin ${TAR_IMAGE}/command ${TAR_IMAGE}/lib ${VERSION_FILE}
	for x in ${PROJECTS}; do (cd $$x && ${MAKE} $(MFLAGS)) && cp $$x/gen/* ${TAR_IMAGE}/lib/.; done
	cp script/bin/* ${TAR_IMAGE}/bin/.
	cp script/command/* ${TAR_IMAGE}/command/.

browser: ${DIST} ${TAR_IMAGE}/bin ${VERSION_FILE}
	(cd browser && ${MAKE} $(MFLAGS) VERSION=${VERSION})
	cp -r browser/gen/image/bolt-browser-${VERSION} ${TAR_IMAGE}

${TAR}: projects
	cp LICENSE README.md ${TAR_IMAGE}/.
	tar cfz ${TAR} -C ${GEN}/image .

${WXS}: ${CONFIG_WXS} ${INSTALLER}
	sed 's/__VERSION__/${VERSION}/g' ${CONFIG_WXS} > $@

${BUILD_MSI}:
	echo '@echo off\r' > $@
	echo 'setlocal enableextensions\r' >> $@
	echo 'set base=%~dp0\r' >> $@
	echo 'call candle -o "%base%${MODULE}.wixobj" "%base%${MODULE}.wxs"\r' >> $@
	echo 'call light -spdb -sw1076 -o "%base%..\\dist\\${MODULE}-${VERSION}.msi" -b "%base%..\\image\\${MODULE}-${VERSION}" "%base%${MODULE}.wixobj"\r' >> $@

${DIRECTORIES}:
	mkdir -p $@


clean:
	rm -rf ./${GEN}
	for x in ${PROJECTS}; do (cd $$x && ${MAKE} $(MFLAGS) clean); done


release: clean
	expr `cat ${RELEASE_BUILD_FILE}` + 1 > ${RELEASE_BUILD_FILE} && \
	git commit -m "[release] Bump build number." ${RELEASE_BUILD_FILE} && \
	git push origin master
	$(eval V = `cat ${RELEASE_VERSION_FILE}`.`cat ${RELEASE_BUILD_FILE}`)
	${MAKE} ${MFLAGS} dist VERSION=${V}
	[ ! -d gen/dist.boltjs.io ] || rm -rf gen/dist.boltjs.io
	(cd gen && git clone git@github.com:boltjs/dist.boltjs.io.git)
	mkdir -p gen/dist.boltjs.io/${V}
	cp gen/dist/bolt-${V}.tar.gz gen/image/bolt-${V}/lib/bolt-karma.js gen/dist.boltjs.io/${V}/.
	cp gen/image/bolt-${V}/lib/bolt-karma.js gen/dist.boltjs.io/${V}/.
	cp gen/image/bolt-${V}/lib/bolt.js gen/dist.boltjs.io/${V}/.
	git --work-tree gen/dist.boltjs.io --git-dir gen/dist.boltjs.io/.git add .
	git --work-tree gen/dist.boltjs.io --git-dir gen/dist.boltjs.io/.git commit -m "[release] ${V}"
	git --work-tree gen/dist.boltjs.io --git-dir gen/dist.boltjs.io/.git push origin master
	git --work-tree gen/dist.boltjs.io --git-dir gen/dist.boltjs.io/.git push -f origin master:gh-pages
