loader.api.commonjsevaller = def(
  [
    loader.transporter.commonjs,
    loader.executor.evaller
  ],

  function (commonjs, evaller) {
    var load = function (url, onsuccess, onfailure) {
      var inject = function (data) {
        evaller.execute(data, onsuccess, onfailure);
      };

      commonjs.read(url, inject, onfailure);
    };

    return {
      load: load
    };
  }
);
