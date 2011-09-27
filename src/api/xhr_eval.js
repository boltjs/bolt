loader.api.xhreval = def(
  [
    loader.transporter.xhr,
    loader.executor.eval
  ],

  function (xhr, evil) {
    var load = function (url, onsuccess, onfailure) {
      var inject = function (data) { evil.execute(data, onsuccess, onfailure); };
      xhr(url, inject, onfailure);
    };  
    return {load: load};
  }
);
