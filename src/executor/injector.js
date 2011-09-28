loader.executor.injector = def(
  [
    bolt.kernel,  // FIX
    loader.tag.script
  ],

  function (kernel, script) {
    var execute = function(data, onsuccess, onfailure) {
      var wrappedData = data;

      var inject = function (tag) {
        tag.text = wrappedData;
      };

      var noop = function () {};

      // Injection does not fire events, but execution happens synchronously,
      // so we just make an explicit callback
      script.insert(inject, noop);
      onsuccess(); 
    };

    return {
      execute: execute
    };
  }
);
