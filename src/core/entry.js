compiler.core.entry = def(
  [
    require('fs'),
    require('path')
  ],

  function (fs, path) {

    var cat = function (files) {
      return files.map(function (file) {
        return fs.readFileSync(file, 'UTF-8');
      }).join("\n");
    };

    var write = function (target, contents) {
      fs.writeFileSync(target, contents);
    };

    var dev = function (bootstrap) {
      if (path.exists(bootstrap))
        fs.unlinkSync(bootstrap);
      var files = ['loader', 'kernel', 'module'].map(function (x) {
        return __dirname + '/' + x + '.js';
      });
      var content = cat(files);

      content += '\nwindow.configure = ephox.bolt.module.bootstrap.configure.configure;';

      write(bootstrap, content);
    };

    var prod = function () {

    };

    var compile = function () {

    };

    return {
      dev: dev,
      prod: prod,
      compile: compile
    };
  }
);