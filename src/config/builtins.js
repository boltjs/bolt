module.config.builtins = def(
  [
  ],

  function () {
    // FIX unthunk this.
    var builtins = function (amd) {
      return function () { return { amd: amd } };
    };

    return {
      browser: builtins('global!ephox.bolt.module.modulator.modulators.amdscripttag'),
      commonjs: builtins('global!ephox.bolt.module.modulator.modulators.amdcommonjs')
    };
  }
);
