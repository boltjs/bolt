module.config.builtins = def(
  [
  ],

  function () {
    var browser = function () {
      return {
        amd: 'global!ephox.bolt.module.modulator.modulators.amdscripttag',
        'amd.scripttag': 'global!ephox.bolt.module.modulator.modulators.amdscripttag',
        'amd.xhreval': 'global!ephox.bolt.module.modulator.modulators.amdxhreval',
        'amd.xhrinjector': 'global!ephox.bolt.module.modulator.modulators.amdxhrinjector'
      };
    };

    var commonjs = function () {
      return {
        amd: 'global!ephox.bolt.module.modulator.modulators.amdcommonjs',
        'amd.scripttag': 'global!ephox.bolt.module.modulator.modulators.amdcommonjs',
        'amd.xhreval': 'global!ephox.bolt.module.modulator.modulators.amdcommonjs',
        'amd.xhrinjector': 'global!ephox.bolt.module.modulator.modulators.amdcommonjs'
      };
    };
    return {
      browser: browser,
      commonjs: commonjs
    };
  }
);
