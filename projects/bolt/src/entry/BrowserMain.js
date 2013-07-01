define(
  'bolt.runtime.entry.BrowserMain',

  [
    'bolt.base.fp.Obj',
    'bolt.base.util.Globals',
    'bolt.runtime.api.Bolt',
    'bolt.runtime.api.DeferredBolt',
    'bolt.runtime.entry.BrowserConfig',
    'bolt.runtime.profile.BrowserProfile',
    'bolt.runtime.reader.Reader'
  ],

  function (Obj, Globals, Bolt, DeferredBolt, BrowserConfig, BrowserProfile, Reader) {
    return function () {
      var data = BrowserConfig.probe();
      var globals = data.globals !== 'false';
      var main = data.main !== undefined;
      var config = data.config !== undefined;

      var configure = function (configuration) {
        Reader.browser(configuration, deferred.configured);
      };

      var deferred = DeferredBolt(configure, BrowserProfile);
      var bolt = Bolt(deferred);
      Globals.global.bolt = bolt;

      if (globals) {
        window.define = bolt.define;
        window.require = bolt.require;
      }

      if (main)
        bolt.main(data.main);

      if (config)
        bolt.configure({ configs: [ data.config ]});
    };
  }
);
