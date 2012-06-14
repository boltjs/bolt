loader.api.xhrinjector = def(
  [
    loader.transporter.xhr,
    loader.executor.injector
  ],

  function (xhr, injector) {
    var load = function (url, onsuccess, onfailure) {
      var inject = function (data) {
        injector.execute(data, onsuccess);
      };

      xhr.request(url, inject, onfailure);
    };

    return {
      load: load
    };
  }
);
