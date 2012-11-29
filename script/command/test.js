var usage = function () {
  return 'usage: bolt test [-v|--verbose] [-p|--project PROJECT_FILE] [CONFIG_JS TEST ...]\n' +
         '\n' +
         'arguments:\n' +
         '  CONFIG                   The bolt configuration file to be used for tests\n' +
         '  TEST                     A test file. The test file may contain one or more\n' +
         '                           test methods. Test files have an `assert` library\n' +
         '                           exposed to them automatically.\n' +
         '\n' +
         'example:\n' +
         '  Run all atomic tests.\n' +
         '\n' +
         '    bolt test config/bolt/atomic.js src/test/js/atomic/**/*.js\n' +
         '\n' +
         '\n' +
         '  Run all browser tests.\n' +
         '\n' +
         '    bolt test config/bolt/browser.js src/test/js/browser/**/*.js\n' +
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

  var verbose = false;

  switch (process.argv[0]) {
    case '-v':
    case '--verbose':
      verbose = true;
      process.argv.shift();
      break;
    default:
      if (process.argv[0] && process.argv[0][0] === '-')
        fail_usage(1, 'Unknown flag [' + process.argv[0] +']');
  }


  if (process.argv.length < 2)
    fail_usage(1, 'Not enough arguments, must specify configuration and at least one test file.');

  var config = process.argv[0];
  process.argv.shift();

  var fs = require('fs');

  if (!fs.existsSync(config) || !fs.statSync(config).isFile())
    fail(10, 'Could not find config file [' + config + ']');

  var tests = process.argv.slice(0);

  tests.forEach(function (file) {
    if (!fs.existsSync(file) || !fs.statSync(file).isFile())
      fail(20, 'Could not find test file [' + file + ']');
  });


  require('./../lib/kernel');
  require('./../lib/loader');
  require('./../lib/module');
  require('./../lib/test');

  var runner = ephox.bolt.test.run.runner;
  var reporter = ephox.bolt.test.report.logger.create(verbose === 'true');
  var fn = ephox.bolt.kernel.fp.functions;
  var node = ephox.bolt.module.reader.node;
  var reader = fn.curry(node.read, process.cwd() + '/.', config);

  runner.run(reporter, reader, tests);
};
