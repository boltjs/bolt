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
      { name: "demo.js", path: lib + "/framework" },
      { name: "Makefile", path: "." }
    ]
  },

  {
    name: "bolt-module",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-module.zip",
    targets: [
      { name: "*.js", path: lib + "/module" }
    ]
  },

  {
    name: "bolt-inline",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-inline.zip",
    targets: [
      { name: "*.js*", path: lib + "/inline" }
    ]
  }
];
