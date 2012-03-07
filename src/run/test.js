test.run.test = def(
  [
    ephox.bolt.module.bootstrap.install
  ],

  function (install) {
    var create = function (builtins, load, loadscript, reporter, reader) {
      return function (next, wrapper, testfile, name, deps, fn) {
        install.install(reader, builtins, load, loadscript);
        var wrapped = wrapper(reporter, testfile, name, fn, next);
        ephox.bolt.module.api.require(deps, wrapped);
      };
    };

    return {
      create: create
    };
  }
);
