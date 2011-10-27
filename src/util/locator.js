module.util.locator = def(
  [
  ],

  function () {
    // FIX move to loader project and write tests...
    var browser = function () {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1].src;
    };

    var runtime = module.runtime.locate;

    var locate = function () {
        var f = runtime || browser;
        return f();
    };

    return {
      locate: locate
    };
  }
);
