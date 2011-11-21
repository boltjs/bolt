module.config.modulator = def(
  [
    module.error.error,
    module.modulator.modulators.amd,
    ephox.bolt.kernel.modulator.globalator,
    ephox.bolt.kernel.fp.array
  ],

  function (error, amd, globalator, ar) {
    var types = function (specs) {
      var ts = {
        amd: 'global!ephox.bolt.module.modulator.modulators.amd',
        'amd.scripttag': 'global!ephox.bolt.module.modulator.modulators.amdscripttag',
        'amd.xhreval': 'global!ephox.bolt.module.modulator.modulators.amdxhreval',
        'amd.xhrinjector': 'global!ephox.bolt.module.modulator.modulators.amdxhrinjector'
      };

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
