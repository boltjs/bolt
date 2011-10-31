module.config.modulator = def(
  [
    ephox.bolt.kernel.modulator.globalator,
    module.modulator.modulators.amd,
    ephox.bolt.kernel.fp.array
  ],

  function (globalator, amd, ar) {
    var ts = {
      amd: 'global!ephox.bolt.module.modulator.modulators.amd',
      'amd.scripttag': 'global!ephox.bolt.module.modulator.modulators.amdscripttag',
      'amd.xhreval': 'global!ephox.bolt.module.modulator.modulators.amdxhreval',
      'amd.xhrinjector': 'global!ephox.bolt.module.modulator.modulators.amdxhrinjector',
      compiled: 'global!ephox.bolt.module.modulator.modulators.compiled',
      'compiled.scripttag': 'global!ephox.bolt.module.modulator.modulators.compiledscripttag',
      'compiled.xhreval': 'global!ephox.bolt.module.modulator.modulators.compiledxhreval',
      'compiled.xhrinjector': 'global!ephox.bolt.module.modulator.modulators.compiledxhrinjector'
    };
    var types = function (specs) {
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
