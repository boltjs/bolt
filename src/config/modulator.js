module.config.modulator = def(
  [
    module.error.error,
    module.modulator.modulators.amdscripttag,
    ephox.bolt.kernel.modulator.globalator,
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.object
  ],

  function (error, amd, globalator, ar, obj) {
    var types = function (builtins, specs) {
      var r = {};
      obj.each(builtins, function (key, value) {
        r[key] = { instance: value };
      });
      ar.each(specs, function (spec) {
        r[spec.type] = { id: spec.modulator };
      });
      return r;
    };

    return {
      types: types
    };
  }
);
