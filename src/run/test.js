test.run.test = def(
  [
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.module.config.builtins.commonjs,
    ephox.bolt.module.bootstrap.install,
    ephox.bolt.module.reader.node,
    ephox.bolt.loader.transporter.commonjs.read,
    test.runner.wrapper
  ],

  function (fn, builtins, install, node, transport, wrapper) {
    var create = function (reporter, reader, testcase) {
      return function (deps, fn) {
        if (typeof deps === 'function' && fn === undefined) {
          fn = deps;
          deps = [];
        }

        install.install(reader, builtins, transport);

        var testcase = wrapper.wrap(reporter, testcase, fn);

        global.define = ephox.bolt.module.api.define;
        global.require = ephox.bolt.module.api.require;
        global.demand = ephox.bolt.module.api.demand;
        ephox.bolt.module.api.require(deps, testcase);
        delete global.define;
        delete global.require;
        delete global.demand;
      };
    };

    return {
      create: create
    };
  }
);