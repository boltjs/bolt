define(
  'bolt.loader.executor.Evaller',

  [
  ],

  function () {
    var execute = function (data, onsuccess, onfailure) {
      var define = Function('return this;')().define;
      try {
        eval(data);
      } catch(e) {
        onfailure(e);
        return;
      }

      onsuccess();
    };

    return {
      execute: execute
    };
  }
);
