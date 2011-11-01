compiler.minibolt.node = def(
  [
  ],

  function () {
    var load = function (url, onsuccess, onfailure) {
      // FIX error handling
      require(url);
      onsuccess();
    };

    return {
      load: load
    };
  }
);
