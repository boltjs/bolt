module.config.builtins = def(
  [
    ephox.bolt.module.modulator.modulators.boltscripttag,
    ephox.bolt.module.modulator.modulators.boltcommonjs,
    ephox.bolt.module.modulator.modulators.libscripttag,
    ephox.bolt.module.modulator.modulators.libcommonjs
  ],

  function (boltscripttag, boltcommonjs, libscripttag, libcommonjs) {
    return {
      // 'amd' is maintained for backwards compatibility, will be removed at some point.
      browser: { bolt: boltscripttag, amd: boltscripttag, lib: libscripttag },
      commonjs: { bolt: boltcommonjs, amd: boltcommonjs, lib: libcommonjs }
    };
  }
);
