bolt.test.run.Test = def(
  [
    bolt.module.bootstrap.Install,
    bolt.test.run.Config
  ],

  function (Install, Config) {
    var create = function (builtins, load, loadscript, reporter, reader) {

      return function (next, wrapper, testfile, name, replacements, deps, fn) {
        var enriched = Config.enricher(reader, testfile, replacements);
        Install.install(enriched, builtins, load, loadscript);
        var wrapped = wrapper(reporter, testfile, name, fn, next);
        bolt.module.api.require(deps, wrapped);
      };
    };

    return {
      create: create
    };
  }
);
