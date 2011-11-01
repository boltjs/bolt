compiler.compile.modulator = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.modulator.amd,
    ephox.bolt.kernel.modulator.globalator,
    compiler.minibolt.minibolt,
    compiler.loader.node
  ],

  function (ar, amd, globalator, minibolt, node) {
    var compiler = function (spec, pather) {
      var source = amd.create(node, pather, spec.namespace, spec.path, spec.mapper);
      var sources = [source, globalator.create() ];
      return minibolt.demand(sources, spec.compiler);
    };

    var types = function (specs, pather) {
      var is = {
        amd: ephox.bolt.compiler.modulator.amd
      };
      ar.each(specs, function (spec) {
        is[spec.type] = compiler(spec, pather);
      });
      return is;
    };

    return {
      types: types
    };
  }
);
