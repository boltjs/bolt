define(
  'bolt.runtime.reader.NodeReader',

  [
    'bolt.runtime.reader.Bouncing'
  ],

  function (Bouncing) {
    var read = function (relativeto, file, done, acc) {
      var fs = require('fs');
      var path = require('path');
      var accumulated = acc || { sources: [], types: [],  configs: [] };
      var base = path.dirname(relativeto);
      var absolute = path.resolve(base, file);
      var payload = fs.readFileSync(absolute, 'UTF-8');
      Bouncing.evaluate(absolute, payload, done, read, accumulated);
    };

    return {
      read: read
    };
  }
);
