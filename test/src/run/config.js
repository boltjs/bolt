test.run.config = def(
  [
    ephox.bolt.kernel.fp.object,
    ephox.bolt.module.config.mapper,
    ephox.bolt.module.config.specs,
    ephox.bolt.module.util.path
  ],

  function (obj, mapper, specs, path) {
    var sources = function (testfile, replacements) {
      var r = [];
      var testpath = path.dirname(testfile);
      var sourcer = specs.source(testpath);
      obj.each(replacements, function (i, o) {
        var name = path.basename(o);
        var source = sourcer('bolt', i, path.dirname(o), mapper.constant(name));
        r.push(source);
      });

      return r;
    };

    var enricher = function (reader, testfile, replacements) {
      var extra = sources(testfile, replacements);
      return function (done) {
        reader(function (configuration) {
          done({
            types: configuration.types,
            sources: extra.concat(configuration.sources)
          });
        });
      };
    };

    return {
      enricher: enricher
    };
  }
);
