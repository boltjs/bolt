runDemo('Loader - XHR Injector', function() {
  var result = createOutputElement('xhr_injector did not run');

  ephox.bolt.loader.api.xhrinjector.load('api/xhr_injector_payload.js', function () {
    pass(result, 'xhr_injector callback ran @ ' + new Date().getTime());
  });
});