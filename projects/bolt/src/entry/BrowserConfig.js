define(
  'bolt.runtime.entry.BrowserConfig',

  [
    'bolt.base.fp.Func'
  ],

  function (Func) {
    var withAttr = function (attr, f, otherwise) {
      var scripts = document.getElementsByTagName('script');
      var last = scripts[scripts.length - 1];
      return last && last.hasAttribute(attr) ?
        f(last.getAttribute(attr)) : otherwise();
    };

    var getAttr = function (attr, dfault) {
      return withAttr(attr, Func.identity, Func.constant(dfault));
    };

    var probe = function () {
      return {
        config: getAttr('data-bolt-config'),
        main: getAttr('data-bolt-main'),
        globals: getAttr('data-bolt-globals')
      };
    };

    return {
      probe: probe,
      withAttr: withAttr,
      getAttr: getAttr
    };
  }
);
