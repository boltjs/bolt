runDemo('Loader - Script Tag', function() {
  var result = createOutputElement('script_tag did not run');

  ephox.bolt.loader.api.scripttag.load('api/script_tag_payload.js', function () {
    pass(result, 'script_tag callback ran @ ' + new Date().getTime());
  });
});