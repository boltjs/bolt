runDemo('Loader - XHR Injector', function () {
  var result = createOutputElement('xhr_injector did not run');

  ephox.bolt.loader.api.xhrinjector.load('api/xhr_injector_payload.js', function () {
    var fn = blueprints.xhr_injector && blueprints.xhr_injector.id === "xhr_injector" ? pass : fail;
    fn(result, 'xhr_injector module defined');
  });
});