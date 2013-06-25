bolt.test.run.Config = def(
  [
    bolt.kernel.fp.Obj,
    bolt.module.config.Mapper,
    bolt.module.config.Specs,
    bolt.module.util.Path
  ],

  function (Obj, Mapper, Specs, Path) {
    var sources = function (testfile, replacements) {
      var r = [];
      var testpath = Path.dirname(testfile);
      var sourcer = Specs.source(testpath);
      Obj.each(replacements, function (i, o) {
        var name = Path.basename(o);
        var source = sourcer('bolt', i, Path.dirname(o), Mapper.constant(name));
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
