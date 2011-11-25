module.config.modulator = def(
  [
    module.error.error,
    module.modulator.modulators.amdscripttag,
    ephox.bolt.kernel.modulator.globalator,
    ephox.bolt.kernel.fp.array
  ],

  function (error, amd, globalator, ar) {
    var types = function (builtins, specs) {
      var ts = builtins();
      ar.each(specs, function (spec) {
        ts[spec.type] = spec.modulator;
      });
      return ts;
    };

    var source = function (spec, pather) {
      return ar.map(spec.sources, function (s) {
        if (s.type !== 'amd')
          throw 'Modulator sources only support amd, was [' + s.type + ']';
        return amd.create.apply(null, [ pather ].concat(s.args));
      });
    };

    var sources = function (specs, pather) {
      return ar.flatmap(specs, function (spec) {
        return source(spec, pather);
      }).concat([ globalator.create() ]);
    };

    return {
      types: types,
      sources: sources
    };
  }
);
