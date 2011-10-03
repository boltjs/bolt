runDemo('Manager - Hello world', function() {
  var result = createOutputElement('hello_world did not run');

  var onerror = function (message) {
    fail(result, 'kernel call failed: ' + message);
  };

  var modulate = function () {
    var load = function (url, onsuccess, onerror) {
      define('ephox.bolt.demo.hello', [], function() {
          return { greeting: 'hello world!' };
        }
      );
      onsuccess();
    };
    return { serial: false, load: load, url: 'arbitrary.js' };
  };

  var modulator = {
    can: function (id) { return id === 'ephox.bolt.demo.hello'; },
    modulate: function (id) { return modulate(); }
  };

  var kernel = ephox.bolt.kernel.api.config.configure(modulator, onerror);

  window.define = kernel.define;
  window.require = kernel.require;

  require(['ephox.bolt.demo.hello'], function (hello) {
    pass(result, hello.greeting);
  });
});