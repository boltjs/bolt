MODULE = bolt-browser
VERSION = local
LIB = lib
GEN = gen
DIST = ${GEN}/dist
TAR_IMAGE = ${GEN}/image/${MODULE}-${VERSION}
SCALA_VERSION=scala-2.9.2
TAR = ${DIST}/${MODULE}-${VERSION}.tar.gz
BOLT_GEN = ../gen/image

SRC_BIN = src/bin
SRC_JS = src/js
SRC_CSS = src/css
SRC_HTML = src/html

DIRECTORIES = \
	${GEN} \
	${DIST} \
	${TAR_IMAGE} \
	${TAR_IMAGE}/lib \
	${TAR_IMAGE}/www/js \
	${TAR_IMAGE}/www/css \
	${TAR_IMAGE}/www \
	${GEN}/bolt

.PHONY: clean dist sbt

default: clean dist

${DIRECTORIES}:
	mkdir -p $@

clean:
	rm -rf ./${GEN}/bolt ./${GEN}/dist ./${GEN}/image ./${GEN}/sbt

sbt:
	./sbt -Dsbt.log.noformat=true "set version := \"${VERSION}\"" clean update compile test copy-dependencies package

dist: sbt ${TAR_IMAGE} ${TAR_IMAGE}/lib ${TAR_IMAGE}/www/js ${TAR_IMAGE}/www/css ${DIST} ${GEN}/bolt ${BOLT_GEN}
	cp -r ${BOLT_GEN}/bolt-* ${GEN}/bolt
	cp ${GEN}/sbt/target/${SCALA_VERSION}/lib/*.jar ${GEN}/sbt/target/${SCALA_VERSION}/*.jar ${TAR_IMAGE}/lib
	cp ${SRC_HTML}/*.html ${TAR_IMAGE}/www
	cp ${GEN}/bolt/bolt-*/bin/*.js ${SRC_JS}/*.js ${LIB}/*.js ${TAR_IMAGE}/www/js
	cp ${SRC_CSS}/*.css ${TAR_IMAGE}/www/css
	cp -r ${SRC_BIN} README ${TAR_IMAGE}
	tar cfz ${TAR} -C ${GEN}/image .
