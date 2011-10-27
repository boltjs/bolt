module.config.source = def(
  [
    module.modulator.globalator,
    ephox.bolt.kernel.fp.array
  ],

  function (globalator, ar) {
    var sources = function (specs, modulators, pather) {
      var explicit = ar.map(specs, function (spec) {
        var args = [ pather ].concat(spec.args);
        modulators[spec.type].create.apply(null, args);
      });
      var implicit = [ globalator.create() ];
      return explicit.concat(implicit);
    };

    return {
      sources: sources
    };
  }
);
