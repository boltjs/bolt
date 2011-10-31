module.config.modulator = def(
  [
    module.modulator.globalator,
    module.modulator.amd,
    ephox.bolt.kernel.fp.array
  ],

  function (globalator, amd, ar) {
    var types = function (specs) {
      var ts = {
        amd: 'global!ephox.bolt.module.modulator.amd',
        js: 'global!ephox.bolt.module.modulator.js',
        compiled: 'global!ephox.bolt.module.modulator.compiled'
      };
      ar.each(specs, function (spec) {
        ts[spec.type] = spec.modulator;
      });
      return ts;
    };

    var source = function (spec, pather) {
      return amd.create(pather, spec.namespace, spec.path, spec.mapper);
    };

    var sources = function (specs, pather) {
      return ar.map(specs, function (spec) {
        return source(spec, pather);
      }).concat([ globalator.create() ]);
    };

    return {
      types: types,
      sources: sources,
      source: source
    };
  }
);
