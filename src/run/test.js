test.run.test = def(
  [
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.module.config.builtins.commonjs,
    ephox.bolt.module.bootstrap.install,
    ephox.bolt.loader.transporter.commonjs.read,
    test.run.wrapper
  ],

  function (fn, builtins, install, transport, wrapper) {
    var create = function (reporter, reader, testcase, next) {
      var called = false;

      var test = function (name, deps, fn) {
        called = true;

        if (typeof deps === 'function' && fn === undefined) {
          fn = deps;
          deps = [];
        }

        install.install(reader, builtins, transport);

        var wrapped = wrapper.wrap(reporter, testcase, name, fn, next);

        ephox.bolt.module.api.require(deps, wrapped);
      };

      var hastests = function () {
        return called;
      };

      return {
        test: test,
        hastests: hastests
      };
    };

    return {
      create: create
    };
  }
);