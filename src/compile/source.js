compiler.compile.source = def(
  [
    ephox.bolt.kernel.fp.array,
    ephox.bolt.module.bootstrap.pather,
    compiler.modulator.globalator
  ],

  function (ar, pather, globalator) {
    var build = function (modulators, sourcespecs) {
      var specified = ar.map(sourcespecs, function (spec) {
        var modulator = modulators[spec.type];
        if (modulator === undefined)
          throw "Could not find modulator for type: " + spec.type;
        var p = pather.create(spec.relativeto);
        var args = [ p ].concat(spec.args);
        return modulator.create.apply(null, args);
      });
      return specified.concat([ globalator.create() ]);
    };

    return {
      build: build
    };
  }
);
