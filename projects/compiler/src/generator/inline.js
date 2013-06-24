compiler.generator.inline = def(
  [
    compiler.tools.files,
    compiler.tools.io
  ],

  function (files, io) {
    var generate = function (target, compiled) {
      io.saferm(target);
      var fs = files.files(__dirname, ['inline.js', 'inline.js.pre', 'inline.js.post']);
      var inline = fs[0];
      var pre = fs[1];
      var post = fs[2];
      var contents = [ pre, inline, compiled, post ].join('\n');
      io.write(target, contents);
    };

    return {
      generate: generate
    };
  }
);
