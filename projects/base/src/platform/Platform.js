define(
  'bolt.base.platform.Platform',

  [
    'bolt.base.fp.Func',
    'bolt.base.util.Globals'
  ],

  function (Func, Globals) {
    var isNode = function () {
      return typeof module !== 'undefined' && module.exports;
    };

    var isBrowser = Func.not(isNode);

    var run = function (node, browser) {
      return get(node, browser)();
    };

    var get = function (node, browser) {
      return isNode() ? node : browser;
    };

    return {
      isNode: isNode,
      isBrowser: isBrowser,
      run: run,
      get: get
    };
  }
);
