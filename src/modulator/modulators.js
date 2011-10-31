module.modulator.modulators = def(
  [
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.kernel.modulator.amd,
    ephox.bolt.kernel.modulator.compiled,
    ephox.bolt.loader.api.scripttag,
    ephox.bolt.loader.api.xhrevaller,
    ephox.bolt.loader.api.xhrinjector
  ],

  function (fn, amd, compiled, scripttag, xhrevaller, xhrinjector) {
    var wrap = function (modulator, loader) {
      var create = fn.curry(modulator.create, loader);

      return {
        create: create
      }
    };

    return {
      amd: wrap(amd, scripttag),
      amdscripttag: wrap(amd, scripttag),
      amdxhreval: wrap(amd, xhrevaller),
      amdxhrinjector: wrap(amd, xhrinjector),
      compiled: wrap(compiled, scripttag),
      compiledscripttag: wrap(compiled, scripttag),
      compiledxhreval: wrap(compiled, xhrevaller),
      compiledxhrinjector: wrap(compiled, xhrinjector)
    };
  }
);
