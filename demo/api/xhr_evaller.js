runDemo('Loader - XHR Evaller', function() {
  var result = createOutputElement('xhr_evaller did not run');

  ephox.bolt.loader.api.xhrevaller.load('api/xhr_evaller_payload.js', function () {
    pass(result, 'xhr_evaller callback ran @ ' + new Date().getTime());
  });
});