define(
  'boltc.generator.Bootstrap',

  [
    'boltc.tools.Files',
    'boltc.tools.Io'
  ],

  function (Files, Io) {
    var generate = function (target, bonus) {
      Io.saferm(target);
      var corefiles = Files.files(__dirname, ['bolt.js']);
      var contents =  corefiles.join('\n') + bonus;
      Io.write(target, contents);
    };

    return {
      generate: generate
    };
  }
);
