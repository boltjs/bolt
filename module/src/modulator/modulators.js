module.modulator.modulators = def(
  [
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.kernel.modulator.bolt,
    ephox.bolt.loader.api.commonjsevaller,
    ephox.bolt.loader.api.scripttag,
    ephox.bolt.loader.api.xhrevaller,
    ephox.bolt.loader.api.xhrinjector
  ],

  function (fn, bolt, commonjsevaller, scripttag, xhrevaller, xhrinjector) {
    var wrap = function (modulator, loader) {
      var create = fn.curry(modulator.create, loader);

      return {
        create: create
      }
    };

    return {
      boltcommonjs: wrap(bolt, commonjsevaller),
      boltscripttag: wrap(bolt, scripttag),
      boltxhreval: wrap(bolt, xhrevaller),
      boltxhrinjector: wrap(bolt, xhrinjector)
    };
  }
);
