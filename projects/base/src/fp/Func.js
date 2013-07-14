define(
  'bolt.base.fp.Func',

  [
  ],

  function () {
    var constant = function (v) {
      return function () {
        return v;
      };
    };

    var identity = function (v) {
      return v;
    };

    var curry = function (f) {
      var slice = Array.prototype.slice;
      var args = slice.call(arguments, 1);
      return function () {
        var all = args.concat(slice.call(arguments, 0));
        return f.apply(null, all);
      };
    };

    var not = function (z) {
      return function () {
        var slice = Array.prototype.slice;
        return !z.apply(null, slice.call(arguments, 0));
      };
    };

    var apply = function (f) {
      var slice = Array.prototype.slice;
      return f.apply(null, slice.call(arguments, 0));
    };

    return {
      constant: constant,
      identity: identity,
      curry: curry,
      not: not,
      apply: apply
    };
  }
);
