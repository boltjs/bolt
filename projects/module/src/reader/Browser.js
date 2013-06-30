bolt.module.reader.Browser = def(
  [
    bolt.module.error.Error,
    bolt.module.reader.Bouncing,
    bolt.base.util.Path,
    bolt.loader.transporter.Xhr
  ],

  function (Error, Bouncing, Path, Xhr) {
    var read = function (relativeto, file, done, acc) {
      var accumulated = acc || { sources: [], types: [],  configs: [] };
      var base = Path.dirname(relativeto);
      var absolute = base + '/' + file;
      Xhr.request(absolute, function (payload) {
        Bouncing.evaluate(absolute, payload, done, read, accumulated);
      }, Error.die);
    };

    return {
      read: read
    };
  }
);
