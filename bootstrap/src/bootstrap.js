(function () {
  var obj = ephox.bolt.kernel.fp.object;
  var api = ephox.bolt.module.api;
  var builtins = ephox.bolt.module.config.builtins.browser;
  var install = ephox.bolt.module.bootstrap.install;
  var transport = ephox.bolt.loader.transporter.xhr.request;
  var script = ephox.bolt.loader.api.scripttag.load;
  var configloader = ephox.bolt.module.bootstrap.configloader;

  var withAttr = function (attr, f, otherwise) {
    var scripts = document.getElementsByTagName('script');
    var last = scripts[scripts.length - 1];
    return last && last.hasAttribute(attr)) ?
      f(last.getAttribute(attr)) : otherwise();
  };

  var withConfig = function (f, otherwise) {
    return withAttr('data-bolt-config', f, otherwise);
  };

  var withMain = function (f, otherwise) {
    return withAttr('data-bolt-main', f, otherwise);
  };

  var withGlobals = function (f, otherwise) {
    return withAttr('data-bolt-globals', f, otherwise);
  };

  var reader = withConfig(function (path) {
    return configloader.page(path);
  }, function () {
    return configloader.empty;
  });

  install.install(reader, builtins, transport, script);

  withMain(function (main) {
    api.main(main);
  }, function () {})

  var register = withGlobals(function (globals) {
    return globals !== 'false';
  }, function () {
    return true;
  });

  if (register)
    obj.merge(window, api);
})();
