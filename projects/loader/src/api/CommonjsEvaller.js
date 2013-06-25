bolt.loader.api.CommonjsEvaller = def(
  [
    bolt.loader.transporter.Commonjs,
    bolt.loader.executor.Evaller
  ],

  function (Commonjs, Evaller) {
    var load = function (url, onsuccess, onfailure) {
      var inject = function (data) {
        Evaller.execute(data, onsuccess, onfailure);
      };

      Commonjs.read(url, inject, onfailure);
    };

    return {
      load: load
    };
  }
);
