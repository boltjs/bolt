var usage = function () {
  return 'usage: bolt build [-p|--project PROJECT_FILE] [-c|--config CONFIG_JS]\n' +
         '                  [-s|--src SRC_DIR] [-o|--output OUTPUT_DIR] [-m|--modules]\n' +
         '                  [-n|--inline-main MAIN_MODULE] [-r|--inline-register]\n' +
         '                  [-e|--entry-points FILE ...] [-g|--entry-group NAME FILE ...]\n' +
         '\n' +
         'options:\n' +
         '  -p|--project PROJECT_FILE      override project configuration file. This json\n' +
         '                                 configuration file format allows defaults to be\n' +
         '                                 specified for all bolt command line arguments.\n' +
         '                                   default: project.json\n' +
         '  -c|--config CONFIG_JS          override bolt configuration file.\n' +
         '                                   default: config/bolt/prod.js\n' +
         '  -s|--src SRC_DIR               override source directory.\n' +
         '                                   default: src/js\n' +
         '  -o|--output OUTPUT_DIR         override build output directory. Compiled\n' +
         '                                 output will be located at $OUTPUT_DIR/compile,\n' +
         '                                 inline output at $OUTPUT_DIR/inline, modules at\n' +
         '                                 $OUTPUT_DIR/module.\n' +
         '                                   default: gen/bolt\n' +
         '  -m|--modules                   enable generation of flat module files.\n' +
         '  -n|--inline-main MAIN_MODULE   generate an inline script with a specified main\n' +
         '                                 module (only produces output in conjunction\n' +
         '                                 with -e or -g).\n' +
         '  -r|--inline-register           generate an inline script that registers\n' +
         '                                 modules in a global namespace (only produces\n' +
         '                                 output in conjunction with -e or -g).\n' +
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
         '    bolt build -e src/js/**/*Main.js\n' +
         '\n' +
         '\n' +
         '  Produce a bolt build for a top level library. A self-contained script\n' +
         '  registering all modules globally in their namespace will be produced.\n' +
         '\n' +
         '    bolt build -r -g example src/js/**/api/*.js\n' +
         '\n' +
         '\n' +
         '  Produce a bolt build for a general purpose library. In this build we only want\n' +
         '  modules to be produced, no compiled output.\n' +
         '\n' +
         '    bolt build -m src/js\n' +
         '\n' +
         '\n' +
         'note:\n' +
         '  Examples assume use of a shell with "**" glob support. This means either zsh\n' +
         '  or bash 4.x with `shopt -s globstar` set. If you are an insolent mac user with\n' +
         '  a default bash 3.x, this tool strongly recommends you upgrade.\n' +
         '\n' +
         '  If you become desperate something like $(find test/js/atomic -name \*.js) could\n' +
         '  be used as a substitute.\n';
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

  var project_file = null;
  var config_js = null;
  var src_dir = null;
  var output_dir = null;
  var generate_modules = null;
  var inline_main = null;
  var inline_register = null;
  var entry_points = null;
  var entry_groups = null;

  var path = require('path');
  var files = require('./../lib/files');

  while (process.argv.length > 0 && process.argv[0][0] === '-') {
    var flag = process.argv[0];
    process.argv.shift();

    switch (flag) {
      case '-p':
      case '--project':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        project_file = process.argv[0];
        process.argv.shift();
        break;
      case '-c':
      case '--config':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        config_js = process.argv[0];
        process.argv.shift();
        break;
      case '-s':
      case '--src':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        src_dir = process.argv[0];
        process.argv.shift();
        break;
      case '-o':
      case '--output':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        output_dir = process.argv[0];
        process.argv.shift();
        break;
      case '-m':
      case '--modules':
        generate_modules = true;
        break;
      case '-n':
      case '--inline-main':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        inline_main = process.argv[0];
        process.argv.shift();
        break;
      case '-r':
      case '--inline-register':
        inline_register = true;
        break;
      case '-e':
      case '--entry-points':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');

        while (process.argv.length > 0 && process.argv[0][0] !== '-') {
          var entry = process.argv[0];
          process.argv.shift();
          if (!files.isFile(entry))
            fail(1, 'specified file for entry point not found [' + entry + ']');

          if (entry_points === null) entry_points = [];
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

        if (entry_groups === null) entry_groups = {};
        entry_groups[name] = [];

        while (process.argv.length > 0 && process.argv[0][0] !== '-') {
          var file = process.argv[0];
          process.argv.shift();
          if (!files.isFile(file))
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

  require('./../lib/bolt');
  var compiler = require('./../lib/boltc');

  var project_file_reader = require('./../lib/project-file-reader');

  if (project_file && !files.isFile(project_file))
    fail(1, project_file + ' does not exist or is not a file');

  var resolve = function (name, scope) {
    var get = function (parts, scope) {
      var r = scope;
      for (var i = 0; i < parts.length && r !== undefined; ++i)
        r = r[parts[i]];
      return r;
    };

    var parts = name.split('.');
    return get(parts, scope);
  };

  var config = project_file_reader.read(project_file || 'project.json', fail);

  config_js = config_js || resolve('build.config', config) || 'config/bolt/prod.js';
  src_dir = src_dir || resolve('src', config) || 'src/js';
  output_dir = output_dir || resolve('output', config) || 'gen/bolt';
  generate_modules = generate_modules || resolve('build.flat-modules', config) === true;
  inline_main = inline_main || resolve('build.inline-main', config);
  inline_register = inline_register || resolve('build.inline-register', config) === true;
  entry_points = entry_points || resolve('build.entry-points', config) || [];
  entry_groups = entry_groups || resolve('build.entry-groups', config) || {};

  var generate_inline = inline_main !== undefined || inline_register;


  var targets = [];

  var bolt_build_inline = function (file, name) {
    files.mkdirp(path.join(output_dir, 'inline'));
    var target = path.join(output_dir, 'inline', name + '.js');
    compiler.mode.Inline.run(config_js, [ file ], target, inline_register, inline_main);
  };

  var bolt_build_entry_point = function (done) {
    files.mkdirp(path.join(output_dir, 'compile'));

    var process = function (file) {
      var id = compiler.mode.Identify.run(file);
      var target = path.join(output_dir, 'compile', id + '.js');
      targets.push(target);  // So that things can be linked together later

      compiler.mode.Compile.run(config_js, [ file ], target, function () {
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
    files.mkdirp(path.join(output_dir, 'compile'));

    var groups = Object.keys(entry_groups);

    var process = function (group) {
      var target = path.join(output_dir, 'compile', group + '.js');
      targets.push(target);  // So that things can be linked together later

      compiler.mode.Compile.run(config_js, entry_groups[group], target, function () {
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
    compiler.mode.Link.run(config_js, targets, link_output);
  };

  var bolt_modules = function () {
    if (!files.isDirectory(src_dir))
      fail(1, src_dir + ' does not exist or is not a directory');

    if (generate_modules) {
      var module_dir = path.join(output_dir, 'module');
      files.mkdirp(module_dir);
      files.walk(src_dir, function (file) {
        var name = compiler.mode.Identify.run(file);
        files.write(path.join(module_dir, name + '.js'), files.read(file));
      });
    }
  };

  if (!files.isFile(config_js))
    fail(1, config_js + ' does not exist or is not a file');

  if (files.exists(output_dir))
    files.clean(output_dir);

  bolt_build_entry_point(function () {
    bolt_build_entry_group(function () {
      if (targets.length > 0)
        bolt_link();

      if (generate_modules)
        bolt_modules();
    });
  });
};
