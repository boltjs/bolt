compiler.mode.dev = def(
  [
    compiler.tools.io
  ],

  function (io) {
    var run = function (bootstrap) {
      io.saferm(bootstrap);

      var files = ['loader', 'kernel', 'module'].map(function (x) {
        return __dirname + '/' + x + '.js';
      });

      var content = io.readall(files).join('\n');

      content += '\nwindow.configure = ephox.bolt.module.bootstrap.configure.configure;';

      io.write(bootstrap, content);
    };

    return {
      run: run
    };
  }
);