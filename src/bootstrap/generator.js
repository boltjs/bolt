compiler.bootstrap.generator = def(
  [
    compiler.tools.files,
    compiler.tools.io
  ],

  function (files, io) {

    var generate = function (bootstrap, bonus) {
      io.saferm(bootstrap);
      var corefiles = files.files(__dirname, ['kernel.js', 'loader.js', 'module.js']);
      var contents =  corefiles.join('\n') + bonus;
      io.write(bootstrap, contents);
    };

    return {
      generate: generate
    };
  }
);