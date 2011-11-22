module.modulator.modulators = def(
  [
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.kernel.modulator.amd,
    ephox.bolt.loader.api.commonjsevaller,
    ephox.bolt.loader.api.scripttag,
    ephox.bolt.loader.api.xhrevaller,
    ephox.bolt.loader.api.xhrinjector
  ],

  function (fn, amd, commonjsevaller, scripttag, xhrevaller, xhrinjector) {
    var wrap = function (modulator, loader) {
      var create = fn.curry(modulator.create, loader);

      return {
        create: create
      }
    };

    return {
      amdcommonjs: wrap(amd, commonjsevaller),
      amdscripttag: wrap(amd, scripttag),
      amdxhreval: wrap(amd, xhrevaller),
      amdxhrinjector: wrap(amd, xhrinjector)
    };
  }
);
