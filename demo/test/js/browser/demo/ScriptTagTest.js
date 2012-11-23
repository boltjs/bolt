asynctest(
  'Script tag load test',

  [
    'global!ephox.bolt.loader.api.scripttag'
  ],

  function (scripttag, onsuccess, onfailure) {
    console.log(scripttag)
    scripttag.load('project/src/main/lib/example_library.js', function () {
      console.log('loaded')
      if (rawexample)
        onsuccess();
      else
        onfailure('returned success, but expected global "rawexample" was not set.');
    }, function () {
      onfailure('scripttag failed to load');
    });
  }
);
