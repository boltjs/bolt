loader.api.xhrevaller = def(
  [
    loader.transporter.xhr,
    loader.executor.evaller
  ],

  function (xhr, evaller) {
    var load = function (url, onsuccess, onfailure) {
      var inject = function (data) {
        evaller.execute(data, onsuccess, onfailure);
      };

      xhr.request(url, inject, onfailure);
    };

    return {
      load: load
    };
  }
);
