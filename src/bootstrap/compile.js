module.bootstrap.compile = def(
  [
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    ephox.bolt.loader.api.scripttag,
    module.bootstrap.main
  ],

  // FIX This matches the dev logic from Marli's script things. It does not make a lot of sense for compiled mode.
  function (config, compound, scripttag, main) {
    module.runtime = {};

    var configure = function (bootstrapBasePath) {
      return function (configurator) {
        var pather = function(path) {
          return bootstrapBasePath + '/' + path;
        };

        var modulators = configurator(pather);
        var boltApi = config.configure(compound.create(modulators), onerror);

        module.runtime.define = boltApi.define;
        module.runtime.require = boltApi.require;
      };
    };

    var install = function () {
      var scripts = document.getElementsByTagName("script");

      var bootstrapUrl = scripts[scripts.length - 1].src;
      var bootstrapBasePath = bootstrapUrl.substring(0, bootstrapUrl.lastIndexOf('/bootstrap.js'));

      module.runtime.main = main.main;
      module.runtime.configure = configure(bootstrapBasePath);
    };

    return {
      install: install
    };
  }
);
