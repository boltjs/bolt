module.config.modulator = def(
  [
    module.error.error,
    module.bootstrap.pather,
    module.modulator.modulators.amdscripttag,
    ephox.bolt.kernel.modulator.globalator,
    ephox.bolt.kernel.fp.array
  ],

  function (error, pather, amd, globalator, ar) {
    var types = function (builtins, specs) {
      var all = {
        amd: builtins.amd
      };
      ar.each(specs, function (spec) {
        all[spec.type] = spec.modulator;
      });
      return all;
    };

    var source = function (builtins, spec) {
      return ar.map(spec.sources, function (s) {
        if (s.type !== 'amd')
          throw 'Modulator sources only support amd, was [' + s.type + ']';
        var p = pather.create(s.relativeto);
        return builtins.amd.create.apply(null, [ p ].concat(s.args));
      });
    };

    var sources = function (builtins, specs) {
      return ar.flatmap(specs, function (spec) {
        return source(builtins, spec);
      }).concat([ globalator.create() ]);
    };

    return {
      types: types,
      sources: sources
    };
  }
);
