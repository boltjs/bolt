bolt.compiler.generator.Inline = def(
  [
    bolt.compiler.tools.Files,
    bolt.compiler.tools.Io
  ],

  function (Files, Io) {
    var generate = function (target, compiled) {
      Io.saferm(target);
      var fs = Files.files(__dirname, ['inline.js', 'inline.js.pre', 'inline.js.post']);
      var inline = fs[0];
      var pre = fs[1];
      var post = fs[2];
      var contents = [ pre, inline, compiled, post ].join('\n');
      Io.write(target, contents);
    };

    return {
      generate: generate
    };
  }
);
