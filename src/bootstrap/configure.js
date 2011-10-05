module.bootstrap.configure = def(
  [
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    ephox.bolt.loader.api.scripttag,
    module.bootstrap.main
  ],

  function (config, compound, scripttag, main) {
    var scripts = document.getElementsByTagName("script");
    var bootstrapUrl = scripts[scripts.length - 1].src;

    var configfile = '../build/module.js';

    var bootstrapBasePath = bootstrapUrl.substring(0, bootstrapUrl.lastIndexOf('/bootstrap.js'));
    var configBasePath = configfile.substring(0, configfile.lastIndexOf('/'));

    var convertConfigRelativePathToPage = function(path) {
      return bootstrapBasePath + '/' + configBasePath + '/' + path;
    };

    window.main = main.main;

    var configure = function (configurator) {
      var pather = function(path) {
        return convertConfigRelativePathToPage(path);
      };

      var modulators = configurator(pather);
      var boltApi = config.configure(compound.create(modulators));

      window.define = boltApi.define;
      window.require = boltApi.require;
    };

    var onsuccess = function() {
      main.configLoaded(window.require);
    };

    // FIX: we need to change this
    var onerror = function(message) {
      throw message;
    };

    scripttag.load(configfile, onsuccess, onerror);

    return {
      configure: configure
    };
  }
);
