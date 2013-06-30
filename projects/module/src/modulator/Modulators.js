bolt.module.modulator.Modulators = def(
  [
    bolt.base.fp.Func,
    bolt.kernel.modulator.Bolt,
    bolt.module.modulator.Library,
    bolt.loader.api.CommonjsEvaller,
    bolt.loader.api.ScriptTag,
    bolt.loader.api.XhrEvaller,
    bolt.loader.api.XhrInjector
  ],

  function (Func, Bolt, Library, CommonjsEvaller, ScriptTag, XhrEvaller, XhrInjector) {
    var wrap = function (modulator, loader) {
      var create = Func.curry(modulator.create, loader);

      return {
        create: create
      }
    };

    return {
      boltcommonjs: wrap(Bolt, CommonjsEvaller),
      boltscripttag: wrap(Bolt, ScriptTag),
      boltxhreval: wrap(Bolt, XhrEvaller),
      boltxhrinjector: wrap(Bolt, XhrInjector),
      libcommonjs: wrap(Library, CommonjsEvaller),
      libscripttag: wrap(Library, ScriptTag),
      libxhreval: wrap(Library, XhrEvaller),
      libxhrinjector: wrap(Library, XhrInjector)
    };
  }
);
