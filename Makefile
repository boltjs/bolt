MODULE = bolt
VERSION = local
PROJECTS= \
	test \
	module \
	loader \
	kernel \
	inline \
	bootstrap \
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


.PHONY: clean dist distwindows projects browser

default: clean projects

dist: clean ${TAR}

release:
	expr `cat ${RELEASE_BUILD_FILE}` + 1 > ${RELEASE_BUILD_FILE} && \
	git commit -m "[release] Bump build number." ${RELEASE_BUILD_FILE} && \
	git push origin master && \
	${MAKE} ${MFLAGS} dist VERSION=`cat ${RELEASE_VERSION_FILE}`.`cat ${RELEASE_BUILD_FILE}`

distwindows: ${TAR} ${WXS} ${BUILD_MSI}

${VERSION_FILE}: ${TAR_IMAGE}
	echo ${VERSION} > ${VERSION_FILE}

projects: ${DIST} ${TAR_IMAGE}/bin ${TAR_IMAGE}/command ${TAR_IMAGE}/lib ${VERSION_FILE}
	for x in ${PROJECTS}; do (cd $$x && ${MAKE} $(MFLAGS) dist) && cp $$x/gen/* ${TAR_IMAGE}/lib/.; done
	cp script/bin/* ${TAR_IMAGE}/bin/.
	cp script/command/* ${TAR_IMAGE}/command/.

browser: ${DIST} ${TAR_IMAGE}/bin ${VERSION_FILE}
	(cd browser && ${MAKE} $(MFLAGS) VERSION=${VERSION})
	cp -r browser/gen/image/bolt-browser-${VERSION} ${TAR_IMAGE}

${TAR}: projects browser
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
