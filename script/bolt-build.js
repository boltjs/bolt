var usage = function () {
  return 'usage: bolt build [-c|--config CONFIG_JS] [-o|--output OUTPUT_DIR] [-s|--src-dir SRC_DIR]\n' +
         '                  [-i|--inline] [-n|--invoke-main MAIN_MODULE] [-r|--register]\n' +
         '                  [-m|--modules] [-e|--entry-points FILE ...] [-g|--entry-group NAME FILE ...]\n' +
         '\n' +
         'options:\n' +
         '  -c|--config CONFIG_JS         override bolt configuration file\n' +
         '                                   default: config/bolt/prod.js\n' +
         '  -o|--output OUTPUT_DIR         override output directory, note this is different\n' +
         '                                 to the jsc compile directory, the compiled output,\n' +
         '                                 will be located at $OUTPUT_DIR/compile\n' +
         '                                   default: scratch/main/js\n' +
         '  -s|--src-dir SRC_DIR           override source directory\n' +
         '                                   default: src/main/js\n' +
         '  -i|--inline                    enable generation of inline scripts (only produces output\n' +
         '                                 in conjunction with -e or -g).\n' +
         '  -n|--invoke-main MAIN_MODULE   specify main module of inline scripts.\n' +
         '  -r|--register                  register modules in global namespace for inline scripts,\n' +
         '                                 this will default to true unless -n is specified.\n' +
         '  -m|--modules                   enable generation of flat module files.\n' +
         '  -e|--entry-points FILE ...     specify a set of entry points, a compiled output\n' +
         '                                 will be generated for each entry point. Multiple\n' +
         '                                 -e flags may be specified.\n' +
         '  -g|--entry-group NAME FILE ... specify an entry group, a single compiled output\n' +
         '                                 will be generated with NAME for each entry-group.\n' +
         '                                 Multiple -g flags may be specified.\n' +
         '\n' +
         'example:\n' +
         '  Produce a bolt build for a top level application. A compiled file will be\n' +
         '  generated for each Main module in this example.\n' +
         '\n' +
         '    bolt build -e src/main/js/**/*Main.js\n' +
         '\n' +
         '\n' +
         '  Produce a bolt build for a top level library. A self contained script registering\n' +
         '  all modules in their namespace will be produced.\n' +
         '\n' +
         '    bolt build -i -g example src/main/js/**/api/*.js\n' +
         '\n' +
         '\n' +
         '  Produce a bolt build for a general purpose library, in this build we only want\n' +
         '  modules to be produced, no compiled output.\n' +
         '\n' +
         '    bolt build -m src/main/js\n' +
         '\n' +
         '\n' +
         'note:\n' +
         '  Examples assume use of a shell with "**" glob support. This means either zsh or\n' +
         '  bash 4.x with `shopt -s globstar` set. If you are an insolent mac user with a\n' +
         '  default bash 3.x, this tool strongly recommends you upgrade (although defenestration\n' +
         '  of said mac is also a valid option).\n' +
         '\n' +
         '  If you become desperate something like $(find src/test/js/atomic -name \*.js) could be\n' +
         '  used as a substitute.\n';
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
};
