var lib = 'lib';
var cleanDirs = [ lib ];

var dependencies = [
  {
    name: "bolt-framework",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-framework.zip",
    targets: [
      { name: "assert.js", path: lib + "/framework" },
      { name: "prelude.js", path: lib + "/framework" },
      { name: "Makefile", path: "." }
    ]
  },
];

