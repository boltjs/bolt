test.run.test = def(
  [
    ephox.bolt.module.bootstrap.install,
    ephox.bolt.test.run.config
  ],

  function (install, config) {
    var create = function (builtins, load, loadscript, reporter, reader) {
      
      return function (next, wrapper, testfile, name, replacements, deps, fn) {
        var enriched = config.enricher(reader, testfile, replacements);
        install.install(enriched, builtins, load, loadscript);
        var wrapped = wrapper(reporter, testfile, name, fn, next);
        ephox.bolt.module.api.require(deps, wrapped);
      };
    };

    return {
      create: create
    };
  }
);
