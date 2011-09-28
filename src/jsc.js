var fs = require('fs');
var compiler = require('./compiler');

var args = process.argv.slice(2) // argv[0] = node, argv[1] = compile.js

var usage = [
    "usage:",
    "    node compile.js [-l|--load FILE] [-d|--dir DIR] ROOT MODULE",
    " or node compile.js [-h|--help]",
    "",
    "options:",
    " -l|--load FILE\t\tload compiler definition from FILE",
    " -d|--dir DIR\t\tload compiler definition from all js files in DIR",
    " -h|--help\t\tprint this help message",
    "",
    "examples:",
    "    node compile.js src/main/js main.js",
    "    node compile.js -l module.js  main.js src/main/js main.js",
    "    node compile.js -l module.js -l i18n.js src/main/js main.js",
    "    node compile.js -d lib/compile src/main/js main.js"
].join("\n")

var die = function (code, message) {
    console.error("error: " + message + "\n");
    console.error(usage);
    process.exit(code);
};

var libraries = [];

while (args.length > 0 && args[0].substring(0, 1) == '-') {
    switch (args[0]) {
    case "-l": case "--load":
        if (args.length < 2)
            die(1, "-l|--load requires an argument specifying the file to load");
        if (!fs.statSync().isFile())
            die(1, "-d|--dir argument must specify an existing file");
        libraries.push(args[1]);
        args = args.slice(2);
        break;
    case "-d": case "--dir":
        if (args.length < 2)
            die(1, "-d|--dir requires an argument specifying the directory to load from");
        if (!fs.statSync().isDirectory())
            die(1, "-d|--dir argument must specify an existing directory");
        var files = fs.readdirSync(args[1])
        libraries = libraries.concat(files);
        args = args.slice(2);
    case "-h": case "--help":
        console.log(usage);
        process.exit(0)
        break;
    default:
        die(1, "unrecognized switch [" + args[0] + "]");
    }
}

if (args.length != 2) {
    die(10, "Incorrect number of arguments. Must specify root directory and single module entry point.");
}

var root = args[0];
var module = args[1];

compiler.compile(root, module, libraries);

