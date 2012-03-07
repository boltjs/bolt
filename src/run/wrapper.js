test.run.wrapper = def(
  [
    Function('return this;')()
  ],

  function (global) {
    var sync = function (reporter, testfile, name, f, next) {
      global.define = ephox.bolt.module.api.define;
      global.require = ephox.bolt.module.api.require;
      global.demand = ephox.bolt.module.api.demand;

      return function (/* arguments */) {
        var testcase = reporter.test(testfile, name);
        try {
          f.apply(null, arguments);
          testcase.pass();
        } catch (f) {
          testcase.fail(f);
        } finally {
          delete global.define;
          delete global.require;
          delete global.demand;
          next();
        }
      };
    };

    var async = function (reporter, testfile, name, f, next) {
      global.define = ephox.bolt.module.api.define;
      global.require = ephox.bolt.module.api.require;
      global.demand = ephox.bolt.module.api.demand;

      return function (/* arguments */) {
        var testcase = reporter.test(testfile, name);

        var oncomplete = function (f) {
          return function () {
            f.apply(null, arguments);
            delete global.define;
            delete global.require;
            delete global.demand;
            next();
          };
        };

        var onsuccess = oncomplete(testcase.pass);
        var onfailure = oncomplete(testcase.fail);

        var args = Array.prototype.slice.call(arguments, 0);

        try {
          fn.apply(null, args.concat([ onsuccess, onfailure ]));
        } catch (e) {
          onfailure(e);
        }
      };
    };


    return {
      sync: sync,
      async: async
    };
  }
);
