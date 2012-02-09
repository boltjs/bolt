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
      var ts = builtins();
      ar.each(specs, function (spec) {
        ts[spec.type] = spec.modulator;
      });
      return ts;
    };

    var source = function (spec) {
      return ar.map(spec.sources, function (s) {
        if (s.type !== 'amd')
          throw 'Modulator sources only support amd, was [' + s.type + ']';
        var p = pather.create(s.relativeto);
        return amd.create.apply(null, [ p ].concat(s.args));
      });
    };

    var sources = function (specs) {
      return ar.flatmap(specs, function (spec) {
        return source(spec);
      }).concat([ globalator.create() ]);
    };

    return {
      types: types,
      sources: sources
    };
  }
);
