loader.executor.evaller = def(
  [
  ],

  function () {
    var execute = function (data, onsuccess, onfailure) {
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
