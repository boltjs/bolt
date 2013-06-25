bolt.module.config.Builtins = def(
  [
    bolt.module.modulator.Modulators
  ],

  function (Modulators) {
    return {
      // 'amd' is maintained for backwards compatibility, will be removed at some point.
      browser: {
        bolt: Modulators.boltscripttag,
        amd: Modulators.boltscripttag,
        lib: Modulators.libscripttag
      },
      commonjs: {
        bolt: Modulators.boltcommonjs,
        amd: Modulators.boltcommonjs,
        lib: Modulators.libcommonjs
      }
    };
  }
);
