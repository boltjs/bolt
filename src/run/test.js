test.run.test = def(
  [
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.module.config.builtins.commonjs,
    ephox.bolt.module.bootstrap.install,
    ephox.bolt.loader.transporter.commonjs.read,
    ephox.bolt.loader.api.commonjsevaller.load,
    test.run.wrapper
  ],

  function (fn, builtins, install, load, loadscript, wrapper) {
    return function (next, reporter, reader, testfile, name, deps, fn) {
      if (typeof deps === 'function' && fn === undefined) {
        fn = deps;
        deps = [];
      }

      install.install(reader, builtins, load, loadscript);

      var wrapped = wrapper.wrap(reporter, testfile, name, fn, next);

      ephox.bolt.module.api.require(deps, wrapped);
    };
  }
);
