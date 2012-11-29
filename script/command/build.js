var usage = function () {
  return 'usage: bolt build [-c|--config CONFIG_JS] [-o|--output OUTPUT_DIR]\n' +
         '                  [-s|--src SRC_DIR] [-i|--inline] [-b|--build-version]\n' +
         '                  [-n|--invoke-main MAIN_MODULE] [-r|--register] [-m|--modules]\n' +
         '                  [-e|--entry-points FILE ...] [-g|--entry-group NAME FILE ...]\n' +
         '                  [-p|--project PROJECT_FILE] [--name NAME] [--package]\n' +
         '                  [--version-module MODULE_ID]\n' +
         '\n' +
         'options:\n' +
         '  -c|--config CONFIG_JS          override bolt configuration file.\n' +
         '                                   default: config/bolt/prod.js\n' +
         '  -o|--output OUTPUT_DIR         override build output directory. Compiled\n' +
         '                                 output will be located at $OUTPUT_DIR/compile,\n' +
         '                                 inline output at $OUTPUT_DIR/inline, modules at\n' +
         '                                 $OUTPUT_DIR/module.\n' +
         '                                   default: scratch/main/js\n' +
         '  -s|--src SRC_DIR               override source directory.\n' +
         '                                   default: src/main/js\n' +
         '  -i|--inline                    enable generation of inline scripts (only\n' +
         '                                 produces output in conjunction with -e or -g).\n' +
         '  -n|--invoke-main MAIN_MODULE   specify a main module for inline scripts.\n' +
         '  -r|--register                  register modules in a global namespace for\n' +
         '                                 inline scripts. Defaults to true unless -n is\n' +
         '                                 specified.\n' +
         '  -m|--modules                   enable generation of flat module files.\n' +
         '  -e|--entry-points FILE ...     specify a set of entry points. A compiled\n' +
         '                                 output will be will be generated for each entry\n' +
         '                                 point. Multiple -e flags may be specified.\n' +
         '  -g|--entry-group NAME FILE ... specify an entry group. A single compiled\n' +
         '                                 output will be generated with NAME for each\n' +
         '                                 entry group. Multiple -g flags may be\n' +
         '                                 specified.\n' +
         '\n' +
         'example:\n' +
         '  Produce a bolt build for a top level application. A compiled file will be\n' +
         '  generated for each Main module in this example.\n' +
         '\n' +
         '    bolt build -e src/main/js/**/*Main.js\n' +
         '\n' +
         '\n' +
         '  Produce a bolt build for a top level library. A self-contained script\n' +
         '  registering all modules globally in their namespace will be produced.\n' +
         '\n' +
         '    bolt build -i -g example src/main/js/**/api/*.js\n' +
         '\n' +
         '\n' +
         '  Produce a bolt build for a general purpose library. In this build we only want\n' +
         '  modules to be produced, no compiled output.\n' +
         '\n' +
         '    bolt build -m src/main/js\n' +
         '\n' +
         '\n' +
         'note:\n' +
         '  Examples assume use of a shell with "**" glob support. This means either zsh\n' +
         '  or bash 4.x with `shopt -s globstar` set. If you are an insolent mac user with\n' +
         '  a default bash 3.x, this tool strongly recommends you upgrade (although\n' +
         '  defenestration of said mac is also a valid option).\n' +
         '\n' +
         '  If you become desperate something like $(find src/test/js/atomic -name \*.js)\n' +
         '  could be used as a substitute.\n';
}

var fail_usage = function (code, message) {
  console.error(message);
  console.error('');
  console.error(usage());
  process.exit(code);
};

var fail = function (code, message) {
  console.error(message);
  process.exit(code);
};


module.exports = function (help_mode) {
  if (help_mode) {
    console.log(usage());
    process.exit();
  }

  var config_js = 'config/bolt/prod.js';
  var output_dir = 'scratch/main/js';
  var src_dir = 'src/main/js';
  var generate_inline = false;
  var generate_modules = false;
  var register_modules = false;
  var main = undefined;
  var entry_points = [];
  var entry_groups = {};

  var path = require('path');
  var fs = require('fs');

  while (process.argv.length > 0 && process.argv[0][0] === '-') {
    var flag = process.argv[0];
    process.argv.shift();

    switch (flag) {
      case '-c':
      case '--config':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        config_js = process.argv[0];
        process.argv.shift();
        break;
      case '-o':
      case '--output':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        output_dir = process.argv[0];
        process.argv.shift();
        break;
      case '-s':
      case '--src':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        src_dir = process.argv[0];
        process.argv.shift();
        break;
      case '-n':
      case '--invoke-main':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
      main = process.argv[0];
      process.argv.shift();
        break;
      case '-r':
      case '--register':
        register_modules = true;
        break;
      case '-i':
      case '--inline':
        generate_inline = true;
        break;
      case '-m':
      case '--modules':
        generate_modules = true;
        break;
      case '-e':
      case '--entry-points':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');

        while (process.argv.length > 0 && process.argv[0][0] !== '-') {
          var entry = process.argv[0];
          process.argv.shift();
          if (!fs.existsSync(entry) || !fs.statSync(entry).isFile())
            fail(1, 'specified file for entry point not found [' + entry + ']');
          entry_points.push(entry);
        }
        break;
      case '-g':
      case '--entry-group':
        if (process.argv.length < 2)
          fail_usage(1, flag + ' requires two arguments to be specified');
        var name = process.argv[0];
        process.argv.shift();
        if (name.indexOf('/') !== -1)
          fail(1, 'entry group name must not contain special characters');
        entry_groups[name] = [];

        while (process.argv.length > 0 && process.argv[0][0] !== '-') {
          var file = process.argv[0];
          process.argv.shift();
          if (!fs.existsSync(file) || !fs.statSync(file).isFile())
            fail(1, 'specified file for entry group not found [' + file + ']');
          entry_groups[name].push(file);
        }
        break;
      case '--':
        break;
      default:
        fail_usage(1, 'invalid flag [' + flag +']');
    }
  }

  // nodejs doesn't have an mkdir -p equivalent
  var mkdirp = function (dir) {
    dir = path.resolve(dir);
    if (!fs.existsSync(dir)) {
      mkdirp(path.dirname(dir));
      fs.mkdirSync(dir);
    }
  };

  // walk a directory tree
  var walk = function (root, processor) {
    var files = fs.readdirSync(root);
    files.forEach(function (file) {
      var filepath = path.join(root, file);
      fs.statSync(filepath).isDirectory() ?
        walk(filepath, processor) : processor(filepath);
    });
  };


  require('./../lib/kernel');
  require('./../lib/loader');
  require('./../lib/module');
  require('./../lib/compiler');

  var targets = [];

  var bolt_build_inline = function (file, name) {
    mkdirp(path.join(output_dir, 'inline'));
    var target = path.join(output_dir, 'inline', name + '.js');
    ephox.bolt.compiler.mode.inline.run(config_js, [ file ], target, register_modules, main);
  };

  var bolt_build_entry_point = function (done) {
    mkdirp(path.join(output_dir, 'compile'));

    var process = function (file) {
      var id = ephox.bolt.compiler.mode.identify.run(file);
      var target = path.join(output_dir, 'compile', id + '.js');
      targets.push(target);  // So that things can be linked together later

      ephox.bolt.compiler.mode.compile.run(config_js, [ file ], target, function () {
        if (generate_inline)
          bolt_build_inline(target, id);
        next();
      });
    };

    var next = function () {
      entry_points.length > 0 ? process(entry_points.shift()) : done();
    };

    next();
  };

  var bolt_build_entry_group = function (done) {
    mkdirp(path.join(output_dir, 'compile'));

    var groups = Object.keys(entry_groups);

    var process = function (group) {
      var target = path.join(output_dir, 'compile', group + '.js');
      targets.push(target);  // So that things can be linked together later

      ephox.bolt.compiler.mode.compile.run(config_js, entry_groups[group], target, function () {
        if (generate_inline)
          bolt_build_inline(target, group);
        next();
      });
    };

    var next = function () {
      groups.length > 0 ? process(groups.shift()) : done();
    };

    next();
  };

  var bolt_link = function () {
    var link_output = path.join(output_dir, 'compile/bootstrap.js');
    ephox.bolt.compiler.mode.link.run(config_js, targets, link_output);
  };

  var bolt_modules = function () {
    if (!fs.existsSync(src_dir) || !fs.statSync(src_dir).isDirectory())
      fail(1, config_js + ' does not exist or is not a directory');

    if (generate_modules) {
      var module_dir = path.join(output_dir, 'module');
      mkdirp(module_dir);
      walk(src_dir, function (file) {
        var name = ephox.bolt.compiler.mode.identify.run(file);
        fs.writeFileSync(path.join(module_dir, name + '.js'), fs.readFileSync(file));
      });
    }
  };


  if (!fs.existsSync(config_js) || !fs.statSync(config_js).isFile())
    fail(1, config_js + ' does not exist or is not a file');

  bolt_build_entry_point(function () {
    bolt_build_entry_group(function () {
      if (targets.length > 0)
        bolt_link();

      if (generate_modules)
        bolt_modules();
    });
  });
};
