module.reader.node = def(
  [
    module.reader.bouncing,
    module.util.path
  ],

  function (bouncing, path, fs) {
    var read = function (relativeto, file, done, acc) {
      var fs = require('fs');
      var accumulated = acc || { sources: [], types: [],  configs: [] };
      var base = path.dirname(relativeto);
      var absolute = base + '/' + file;
      var payload = fs.readFileSync(absolute, 'UTF-8');
      bouncing.evaluate(absolute, payload, done, read, accumulated);
    };

    return {
      read: read
    };
  }
);
