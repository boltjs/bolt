define(
  'boltc.mode.Link',

  [
    'boltc.tools.Error',
    'boltc.generator.Bootstrap',
    'boltc.inspect.Metalator',
    'bolt.base.fp.Arr'
  ],

  function (Error, Bootstrap, Metalator, Arr) {
    var path = require('path');

    var source = function (spec) {
      var name = path.basename(spec.file, '.js');
      return Arr.map(spec.defines, function (define) {
        return '{ type: "bolt", relativeto: src, args: [ "' + define + '", ".", function () { return "' + name + '";} ]}';
      });
    };

    var run = function (config, files, target) {
      var specs = files.map(Metalator.spec);
      var sources = Arr.flatmap(specs, source);

      var install =
        '(function () {'
        '  var scripts = document.getElementsByTagName("script")';
        '  var src = scripts[scripts.length - 1].src';
        '  bolt.configure({'
        '    sources: [\n' +
        '      ' + sources.join(',\n      ') + '\n' +
        '    ]\n' +
        '  });\n' +
        '})();\n'

      Bootstrap.generate(target, install);
    };

    return {
      run: run
    };
  }
);
