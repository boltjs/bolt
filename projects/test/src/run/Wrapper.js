define(
  'bolt.test.run.Wrapper',

  [
    'bolt.test.assert.Assert'
  ],

  function (Assert) {
    var global = Function('return this;')();

    global.assert = Assert;

    var sync = function (bolt, reporter, testfile, name, f, next) {
      global.define = bolt.define;
      global.require = bolt.require;
      global.demand = bolt.demand;

      return function (/* arguments */) {
        var testcase = reporter.test(testfile, name);
        try {
          f.apply(null, arguments);
          testcase.pass();
        } catch (e) {
          testcase.fail(e);
        } finally {
          global.define = undefined;
          global.require = undefined;
          global.demand = undefined;
          next();
        }
      };
    };

    var async = function (bolt, reporter, testfile, name, f, next) {
      global.define = bolt.define;
      global.require = bolt.require;
      global.demand = bolt.demand;

      return function (/* arguments */) {
        var testcase = reporter.test(testfile, name);

        var oncomplete = function (f) {
          return function () {
            f.apply(null, arguments);
            global.define = undefined;
            global.require = undefined;
            global.demand = undefined;
            next();
          };
        };

        var onsuccess = oncomplete(testcase.pass);
        var onfailure = oncomplete(testcase.fail);

        var args = Array.prototype.slice.call(arguments, 0);

        try {
          f.apply(null, args.concat([ onsuccess, onfailure ]));
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
