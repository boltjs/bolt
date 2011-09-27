loader.executor.injector = def(
  [
    loader.tag.script
  ],
    
  function (script) {
    var execute = function(data, onsuccess, onfailure) {
      var inject = function (tag) { tag.text = data; };
      var noop = function () {};
      // injection does not fire events, but happens in sync, so make explicit callback.
      script.bindtag(inject, noop);
      onsuccess(); 
    };
    return {execute: execute};
  }
);
