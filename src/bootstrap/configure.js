module.bootstrap.configure = def(
  [
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    ephox.bolt.loader.api.scripttag,
    module.bootstrap.main
  ],

  function (config, compound, scripttag, main) {
    var configure = function (configurator) {
      var configfile = '../build/module.js';

      var scripts = document.getElementsByTagName("script");

      var bootstrapUrl = scripts[scripts.length - 1].src;

      var bootstrapBasePath = bootstrapUrl.substring(0, bootstrapUrl.lastIndexOf('/bootstrap.js'));
      var configBasePath = configfile.substring(0, configfile.lastIndexOf('/'));

      var convertConfigRelativePathToPage = function(path) {
        return bootstrapBasePath + '/' + configBasePath + '/' + path;
      };

      var pather = function(path) {
        return convertConfigRelativePathToPage(path);
      };

      var modulators = configurator(pather);
      var boltApi = config.configure(compound.create(modulators));

      window.define = boltApi.define;
      window.require = boltApi.require;
    };

    var onsuccess = function() {
      main.configured(window.require);
    };

    // FIX: we need to change this
    var onerror = function(message) {
      throw message;
    };

    var install = function () {
      window.main = main.main;
      window.configure = configure;
      scripttag.load(configfile, onsuccess, onerror);
    };

    return {
      install: install
    };
  }
);
