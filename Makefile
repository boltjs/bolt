MODULE = bolt
VERSION = local
PROJECTS= \
	test \
	module \
	loader \
	kernel \
	inline \
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
DIRECTORIES = ${GEN} ${GEN}/tmp ${DIST} ${TAR_IMAGE} ${TAR_IMAGE}/bin ${INSTALLER}
MFLAGS = -s

.PHONY: clean dist

default: cleandist

dist: ${TAR} ${WXS} ${BUILD_MSI}

cleandist: clean dist

${VERSION_FILE}: ${TAR_IMAGE}
	echo ${VERSION} > ${VERSION_FILE}

${TAR}: ${DIST} ${TAR_IMAGE}/bin ${VERSION_FILE}
	for x in ${PROJECTS}; do (cd $$x && ${MAKE} $(MFLAGS) dist) && cp $$x/gen/* ${TAR_IMAGE}/bin/.; done
	cp script/* ${TAR_IMAGE}/bin/.
	cp LICENCE README.md ${TAR_IMAGE}/.
	tar cfz ${TAR} -C ${GEN}/image .

${WXS}: ${CONFIG_WXS} ${INSTALLER}
	sed 's/__VERSION__/${VERSION}/g' ${CONFIG_WXS} > $@

${BUILD_MSI}:
	echo '@echo off' > $@
	echo 'setlocal enableextensions' >> $@
	echo 'set base=%~dp0' >> $@
	echo 'move "%base%glob.exe" "%base%..\\image\\${MODULE}-${VERSION}"' >> $@
	echo 'candle -o "%base%${MODULE}.wixobj" "%base%${MODULE}.wxs"' >> $@
	echo 'light -spdb -sw1076 -o "%base%..\\dist\\${MODULE}-${VERSION}.msi" -b "%base%..\\image\\${MODULE}-${VERSION}" "%base%${MODULE}.wixobj"' >> $@

${DIRECTORIES}:
	mkdir -p $@

clean:
	rm -rf ./${GEN}
	for x in ${PROJECTS}; do (cd $$x && ${MAKE} $(MFLAGS) clean); done
