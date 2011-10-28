module.config.config = def(
  [
    module.error.error,
    module.modulator.amd,
    module.modulator.globalator,
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    ephox.bolt.kernel.fp.array
  ],

  // FIX split.
  function (error, amd, globalator, config, compound, ar) {
    var configure = function (configuration, pather) {
      var modulatorspecs = configuration.modulators || [];
      var sourcespecs = configuration.sources || [];
      var prebuilt = ar.map(modulatorspecs, function (spec) {
        return amd.create(pather, spec.namespace, spec.path, spec.mapper);
      }).concat([ globalator.create() ]);
      var lookup = {
        amd: 'global!ephox.bolt.module.modulator.amd',
        js: 'global!ephox.bolt.module.modulator.js',
        compiled: 'global!ephox.bolt.module.modulator.compiled'
      };
      ar.each(modulatorspecs, function (spec) {
        lookup[spec.type] = spec.modulator;
      });
      var combined = compound.create(prebuilt, lookup, sourcespecs, pather);
      return config.configure(combined, error.die);
    };

    return {
      configure: configure
    };
  }
);
