bolt.module.util.Locator = def(
  [
  ],

  function () {
    var browser = function () {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1].src;
    };

    // FIX This is shit. Should be passed around or handled like other node/browser switches.
    var runtime = bolt.module.runtime.locate;

    var locate = function () {
      var f = runtime || browser;
      return f();
    };

    return {
      locate: locate
    };
  }
);
