(function () {
  var Obj = bolt.base.fp.Obj;
  var Install = bolt.module.bootstrap.Install;
  var Builtins = bolt.module.config.Builtins;
  var Xhr = bolt.loader.transporter.Xhr;
  var ScriptTag = bolt.loader.api.ScriptTag;
  var Configloader = bolt.module.bootstrap.Configloader;

  var withAttr = function (attr, f, otherwise) {
    var scripts = document.getElementsByTagName('script');
    var last = scripts[scripts.length - 1];
    return last && last.hasAttribute(attr) ?
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
    return Configloader.page(path);
  }, function () {
    return Configloader.empty;
  });

  Install.install(reader, Builtins.browser, Xhr.request, ScriptTag.load);

  withMain(function (main) {
    bolt.module.api.main(main);
  }, function () {})

  var register = withGlobals(function (globals) {
    return globals !== 'false';
  }, function () {
    return true;
  });

  if (register)
    Obj.merge(window, bolt.module.api);
})();
