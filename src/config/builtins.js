module.config.builtins = def(
  [
    ephox.bolt.module.modulator.modulators.amdscripttag,
    ephox.bolt.module.modulator.modulators.amdcommonjs
  ],

  function (amdscripttag, amdcommonjs) {
    return {
      browser: { amd: amdscripttag },
      commonjs: { amd: amdcommonjs }
    };
  }
);
