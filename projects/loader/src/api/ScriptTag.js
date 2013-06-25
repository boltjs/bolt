bolt.loader.api.ScriptTag = def(
  [
    bolt.loader.tag.Script
  ],

  function (Script) {
    var load = function (url, onsuccess, onfailure) {
      var sourcer = function (tag) {
        tag.src = url;
      };

      Script.insert(sourcer, onsuccess);
    };

    return {
      load: load
    };
  }
);
