module.config.builtins = def(
  [
    ephox.bolt.module.modulator.modulators.boltscripttag,
    ephox.bolt.module.modulator.modulators.boltcommonjs
  ],

  function (boltscripttag, boltcommonjs) {
    return {
      // TODO: 'amd' is maintained for backwards compatibility, will be removed
      // at some point.
      browser: { bolt: boltscripttag, amd: boltscripttag },
      commonjs: { bolt: boltcommonjs, amd: boltcommonjs }
    };
  }
);
