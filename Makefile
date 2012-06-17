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
WXS = ${INSTALLER}/${MODULE}-${VERSION}.wxs
WIXOBJ = ${INSTALLER}/${MODULE}-${VERSION}.wixobj
MSI = ${DIST}/${MODULE}-${VERSION}.msi
VERSION_FILE = ${TAR_IMAGE}/bin/version
DIRECTORIES = ${GEN} ${GEN}/tmp ${DIST} ${TAR_IMAGE} ${TAR_IMAGE}/bin ${INSTALLER}
MFLAGS = -s

.PHONY: clean dist

default: cleandist

dist: ${TAR}

cleandist: clean dist

${VERSION_FILE}: ${TAR_IMAGE}
	echo ${VERSION} > ${VERSION_FILE}

${TAR}: ${DIST} ${TAR_IMAGE}/bin ${VERSION_FILE}
	for x in ${PROJECTS}; do (cd $$x && ${MAKE} $(MFLAGS) dist) && cp $$x/gen/* ${TAR_IMAGE}/bin/.; done
	cp script/* ${TAR_IMAGE}/bin/.
	cp LICENCE README.md ${TAR_IMAGE}/.
	tar cfz ${TAR} -C ${GEN}/image .

${WXS}: ${CONFIG_WXS} ${INSTALLER}
	sed 's/__VERSION__/${VERSION}/g' ${CONFIG_WXS} > ${WXS}

${WIXOBJ}: ${WXS}
	candle.exe -o ${WIXOBJ} ${WXS}

${MSI}: ${WIXOBJ} ${TAR_IMAGE}
	light.exe -spdb -sw1076 -o ${MSI} -b ${TAR_IMAGE} ${WIXOBJ}

${DIRECTORIES}:
	mkdir -p $@

installer: ${MSI}

clean:
	rm -rf ./${GEN}
	for x in ${PROJECTS}; do (cd $$x && ${MAKE} $(MFLAGS) clean); done
