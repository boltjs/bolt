module.bootstrap.locator = def(
  [
  ],

  function () {
    var locate = function () {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1].src;
    };

    return {
      locate: locate
    };
  }
);