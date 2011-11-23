module.config.builtins = def(
  [
  ],

  function () {
    var builtins = function (amd) {
      return { amd: amd };
    };

    return {
      browser: builtins('global!ephox.bolt.module.modulator.modulators.amdscripttag'),
      commonjs: builtins('global!ephox.bolt.module.modulator.modulators.amdcommonjs')
    };
  }
);
