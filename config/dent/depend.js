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

  // Only used by demo.html
  {
    name: "jquery",
    repository: "thirdpartyrepo",
    source: "jquery.zip",
    version: "1.4.2/1.4.2.0",
    targets: [
      { name: "jquery-1.4.2.js", path: lib }
    ]
  }
];

