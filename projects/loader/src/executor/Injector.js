define(
  'bolt.loader.executor.Injector',

  [
    'bolt.loader.tag.Script'
  ],

  function (Script) {
    var execute = function (data, onsuccess, onfailure) {
      var inject = function (tag) {
        tag.text = data;
      };

      var noop = function () {};

      // Injection does not fire events, but execution happens synchronously,
      // so we just make an explicit callback
      Script.insert(inject, noop);
      onsuccess();
    };

    return {
      execute: execute
    };
  }
);
