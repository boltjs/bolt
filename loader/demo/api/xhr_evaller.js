runDemo('Loader - XHR Evaller', function () {
  var result = createOutputElement('xhr_evaller did not run');

  ephox.bolt.loader.api.xhrevaller.load('api/xhr_evaller_payload.js', function () {
    var fn = blueprints.xhr_evaller && blueprints.xhr_evaller.id === "xhr_evaller" ? pass : fail;
    fn(result, 'xhr_evaller module defined');
  });
});