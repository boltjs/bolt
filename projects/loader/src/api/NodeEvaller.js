define(
  'bolt.loader.api.NodeEvaller',

  [
    'bolt.loader.transporter.Node',
    'bolt.loader.executor.Evaller'
  ],

  function (Node, Evaller) {
    var load = function (url, onsuccess, onfailure) {
      var inject = function (data) {
        Evaller.execute(data, onsuccess, onfailure);
      };

      Node.read(url, inject, onfailure);
    };

    return {
      load: load
    };
  }
);
