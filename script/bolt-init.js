var usage = function () {
  return 'usage: bolt init [-c|--config CONFIG_DIR]\n' +
         '\n' +
         'options:\n' +
         '  -c|--config CONFIG_DIR          override bolt configuration directory\n' +
         '                                   default: config/bolt\n' +
         '\n' +
         'example:\n' +
         '  Initialise a project after checkout.\n' +
         '\n' +
         '    bolt init\n';
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

  var config_dir = 'config/bolt';

  while (process.argv.length > 0 && process.argv[0][0] === '-') {
    var flag = process.argv[0];
    process.argv.shift();

    switch (flag) {
      case '-c':
      case '--config':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        config_dir = process.argv[0];
        process.argv.shift();
        break;
      case '--':
        break;
      default:
        fail_usage(1, 'invalid flag [' + flag +']');
    }
  }

  var path = require('path');
  var fs = require('fs');

  if (!path.existsSync(config_dir))
    fs.mkdirSync(config_dir);
  else if (!fs.statSync(config_dir).isDirectory())
    fail_usage(2, 'directory specified for CONFIG_DIR exists but is not a directory');

  var files = fs.readdirSync(config_dir);

  files.forEach(function (file) {
    console.log(file);
  });

// for i in `find "$config_dir" -maxdepth 1 -type f -name \*.js -not -name bootstrap\*`; do
//     $base/jsc dev -c "$i" "$config_dir/bootstrap-`basename "$i"`" || exit $?
// done

  process.exit();
};
