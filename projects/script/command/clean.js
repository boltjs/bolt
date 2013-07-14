var usage = function () {
  return 'usage: bolt clean [-p|--project PROJECT_FILE] [-o|--output OUTPUT_DIR] \n' +
         '                  [-v|--verbose]\n' +
         '\n' +
         'options:\n' +
         '  -p|--project PROJECT_FILE   override project configuration file. This json\n' +
         '                              configuration file format allows defaults to be\n' +
         '                              specified for all bolt command line arguments.\n' +
         '                                default: project.json\n' +
         '  -o|--output OUTPUT_DIR      override build output directory. This is the \n' +
         '                              directory that shall be cleaned (corresponds to\n' +
         '                              -o|--ouput for bolt build command).\n' +
         '                                default: gen/bolt\n' +
         '  -v|--verbose                turn on verbose clean output.\n';
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
  var output_dir = null;

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
      case '-o':
      case '--output':
        if (process.argv.length < 1)
          fail_usage(1, flag + ' requires an argument to be specified');
        output_dir = process.argv[0];
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

  var nolog = function () {};

  var files = require('./../lib/files');

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

  var project_file_reader = require('./../lib/project-file-reader');

  if (project_file && !files.isFile(project_file))
    fail(1, project_file + ' does not exist or is not a file');

  var config = project_file_reader.read(project_file || 'project.json', fail);

  output_dir = output_dir || resolve('output', config) || 'gen/bolt';

  if (verbose)
    console.log('cleaning: ', output_dir);

  if (files.exists(output_dir))
    files.clean(output_dir);

  if (verbose)
    console.log('  \\- done');
};
