define(
  'bolt.test.run.Accumulator',

  [
    'bolt.base.fp.Func'
  ],

  function (Func) {
    var global = Function('return this;')();

    var tests = [];

    var push = function (wrapper, testfile, name, replacements, deps, fn) {
      if (typeof deps === 'function' && fn === undefined) {
        fn = deps;
        deps = replacements;
        replacements = {};
      }

      var args = [ wrapper, testfile, name, replacements, deps, fn ];
      tests.push(args);
    };

    var more = function () {
      return tests.length > 0;
    };

    var take = function () {
      if (tests.length > 0)
        return tests.shift();
      throw 'No more, call more() before take().';
    };

    var drain = function (runtest, done) {
      if (more())
        runtest.apply(null, [ Func.curry(drain, runtest, done) ].concat(take()));
      else
        done();
    };

    var register = function (testfile, syncwrapper, asyncwrapper) {

      global.test = function (name, replacements, deps, fn) {
        push(syncwrapper, testfile, name, replacements, deps, fn);
      };

      global.asynctest = function (name, replacements, deps, fn) {
        push(asyncwrapper, testfile, name, replacements, deps, fn);
      };
    };

    return {
      more: more,
      take: take,
      drain: drain,
      register: register
    };
  }
);
