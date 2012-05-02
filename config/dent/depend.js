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
    name: "bolt-loader",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-loader.zip",
    targets: [
      { name: "loader.js", path: lib + "/loader" }
    ]
  },

  {
    name: "bolt-kernel",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-kernel.zip",
    targets: [
      { name: "kernel.js", path: lib + "/kernel" }
    ]
  }
];
