module.bootstrap.prod = def(
  [
    ephox.bolt.kernel.api.config,
    ephox.bolt.kernel.modulator.compound,
    ephox.bolt.loader.api.scripttag,
    module.bootstrap.main
  ],

  function (config, compound, scripttag, main) {
    var install = function () {
      
    };

    return {
      install: install
    };
  }
);