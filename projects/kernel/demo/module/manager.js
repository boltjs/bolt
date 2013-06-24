runDemo('Manager - Hello world', function () {
  var result = createOutputElement('hello_world did not run');

  var onerror = function (message) {
    fail(result, 'kernel call failed: ' + message);
  };

  var regulate = function () {
    var load = function (onsuccess, onerror) {
      define('ephox.bolt.demo.hello', [], function () {
          return { greeting: 'hello world!' };
        }
      );
      onsuccess();
    };
    return { serial: false, load: load, url: 'arbitrary.js' };
  };

  var regulator = {
    can: function (id) { return id === 'ephox.bolt.demo.hello'; },
    regulate: regulate
  };

  var kernel = ephox.bolt.kernel.api.config.configure(regulator, onerror);

  window.define = kernel.define;
  window.require = kernel.require;

  require(['ephox.bolt.demo.hello'], function (hello) {
    pass(result, hello.greeting);
  });
});