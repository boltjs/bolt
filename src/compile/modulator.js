compiler.compile.modulator = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.modulator.amd,
    ephox.bolt.kernel.modulator.globalator,
    ephox.bolt.module.bootstrap.pather,
    compiler.minibolt.minibolt,
    compiler.loader.node
  ],

  function (ar, amd, globalator, pather, minibolt, node) {
    var compiler = function (spec) {
      var sources = ar.map(spec.sources, function (source) {
        var p = pather.create(source.relativeto);
        return amd.create.apply(null, [ node, p ].concat(source.args));
      });
      var all = sources.concat([ globalator.create() ]);
      return minibolt.demand(all, spec.compiler);
    };

    var types = function (specs) {
      var is = {
        amd: ephox.bolt.compiler.modulator.amd
      };
      ar.each(specs, function (spec) {
        is[spec.type] = compiler(spec);
      });
      return is;
    };

    return {
      types: types
    };
  }
);
