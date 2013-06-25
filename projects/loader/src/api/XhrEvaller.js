bolt.loader.api.XhrEvaller = def(
  [
    bolt.loader.transporter.Xhr,
    bolt.loader.executor.Evaller
  ],

  function (Xhr, Evaller) {
    var load = function (url, onsuccess, onfailure) {
      var inject = function (data) {
        Evaller.execute(data, onsuccess, onfailure);
      };

      Xhr.request(url, inject, onfailure);
    };

    return {
      load: load
    };
  }
);
