var usage = function () {
  return 'usage: bolt test [-p|--project PROJECT_FILE] [-v|--verbose] CONFIG TEST ...\n' +
         '\n' +
         'arguments:\n' +
         '  CONFIG                      the bolt configuration file to be used for tests.\n' +
         '  TEST                        a test file. The test file may contain one or more\n' +
         '                              test methods. Test files have an `assert` library\n' +
         '                              exposed to them automatically.\n' +
         '\n' +
         'options:\n' +
         '  -p|--project PROJECT_FILE   override project configuration file. This json\n' +
         '                              configuration file format allows defaults to be\n' +
         '                              specified for all bolt command line arguments.\n' +
         '                                default: project.json\n' +
         '  -v|--verbose                turn on verbose test output.\n' +
         '\n' +
         'example:\n' +
         '  Run all node tests.\n' +
         '\n' +
         '    bolt test config/bolt/node-test.js test/js/node/**/*.js\n' +
         '\n' +
         '\n' +
         '  Run all browser tests.\n' +
         '\n' +
         '    bolt test config/bolt/browser-test.js test/js/browser/**/*.js\n' +
         '\n' +
         '\n' +
         'note:\n' +
         '  Examples assume use of a shell with "**" glob support. This means either zsh\n' +
         '  or bash 4.x with `shopt -s globstar` set. If you are an insolent mac user with\n' +
         '  a default bash 3.x, this tool strongly recommends you upgrade.\n' +
         '\n' +
         '  If you become desperate something like $(find test/js/node -name \*.js) could\n' +
         '  be used as a substitute.\n';
};

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
  var verbose = null;

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
      case '-v':
      case '--verbose':
        verbose = true;
        break;
      case '--':
        break;
      default:
        fail_usage(1, 'invalid flag [' + flag +']');
    }
  }

  var fs = require('fs');

  require('./../lib/base');
  require('./../lib/kernel');
  require('./../lib/loader');
  require('./../lib/module');
  require('./../lib/test');

  var project_file_reader = require('./../lib/project-file-reader');
  var Globals = bolt.base.util.Globals;

  if (project_file && (!fs.existsSync(project_file) || !fs.statSync(project_file).isFile()))
    fail(1, project_file + ' does not exist or is not a file');

  var config = project_file_reader.read(project_file || 'project.json', fail);

  verbose = verbose || Globals.resolve('test.node.verbose', config) === true;
  var config_js = process.argv.length > 0 ? config_js = process.argv.shift() :
      Globals.resolve('test.node.config', config);
  var tests = process.argv.length > 0 ? process.argv.slice(0) :
      Globals.resolve('test.node.tests', config) || [];

  if (!config_js || tests.length === 0)
    fail_usage(1, 'Not enough arguments, must specify configuration and at least one test file.');

  if (!fs.existsSync(config_js) || !fs.statSync(config_js).isFile())
    fail(10, 'Could not find config file [' + config_js + ']');

  tests.forEach(function (file) {
    if (!fs.existsSync(file) || !fs.statSync(file).isFile())
      fail(20, 'Could not find test file [' + file + ']');
  });


  var reporter = bolt.test.report.Logger.create(verbose);
  var reader = bolt.base.fp.Func.curry(bolt.module.reader.Node.read, process.cwd() + '/.', config_js);

  bolt.test.run.Runner.run(reporter, reader, tests);
};
