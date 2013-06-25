bolt.loader.api.XhrInjector = def(
  [
    bolt.loader.transporter.Xhr,
    bolt.loader.executor.Injector
  ],

  function (Xhr, Injector) {
    var load = function (url, onsuccess, onfailure) {
      var inject = function (data) {
        Injector.execute(data, onsuccess);
      };

      Xhr.request(url, inject, onfailure);
    };

    return {
      load: load
    };
  }
);
