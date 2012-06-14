runDemo('Loader - Script Tag', function () {
  var result = createOutputElement('script_tag did not run');

  ephox.bolt.loader.api.scripttag.load('api/script_tag_payload.js', function () {
    var fn = blueprints.script_tag && blueprints.script_tag.id === "script_tag" ? pass : fail;
    fn(result, 'script_tag module defined');
  });
});