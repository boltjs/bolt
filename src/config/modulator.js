module.config.modulator = def(
  [
    module.modulator.globalator,
    ephox.bolt.kernel.fp.array
  ],

  function (globalator, ar) {
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

    var sources = function (specs, pather) {
      return ar.map(specs, function (spec) {
        return amd.create(pather, spec.namespace, spec.path, spec.mapper);
      }).concat([ globalator.create() ]);
    };

    return {
      types: types,
      sources: sources
    };
  }
);
