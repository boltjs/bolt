module.config.modulator = def(
  [
    module.modulator.amd,
    module.modulator.compiled,
    module.modulator.delegate,
    module.modulator.js,
    ephox.bolt.kernel.fp.array
  ],

  function (amd, compiled, delegate, js, ar) {
    var delegator = function (spec) {
      return function () {
        var supplied = Array.prototype.slice.call(arguments, 0);
        var args = [ spec.type + '.Modulator' ].concat(supplied);
        delegate.create.apply(null, args);
      }
    };

    var modulators = function (specs) {
      var ms = {
        amd: amd.create,
        compiled: compiled.create,
        js: js.create
      };

      ar.each(specs, function (spec) {
        ms[spec.type] = delegator(spec);
      });

      return ms;
    };

    return {
      modulators: modulators
    };
  }
);
