define(
  'bolt.runtime.reader.BrowserReader',

  [
    'bolt.runtime.error.Error',
    'bolt.runtime.reader.Bouncing',
    'bolt.base.util.Path',
    'bolt.loader.transporter.Xhr'
  ],

  function (Error, Bouncing, Path, Xhr) {
    var read = function (relativeto, file, done, acc) {
      var accumulated = acc || { sources: [], types: [],  configs: [] };
      var absolute = Path.startsWith(file, '/') ? file : Path.dirname(relativeto) + '/' + file;
      Xhr.request(absolute, function (payload) {
        Bouncing.evaluate(absolute, payload, done, read, accumulated);
      }, Error.die);
    };

    return {
      read: read
    };
  }
);
