var components = 'components';

var cleanDirs = [ components ];

var dependencies = [
  {
    name: "bolt-test",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-test.zip",
    targets: [
      { name: "*.js", path: components }
    ]
  },

  {
    name: "bolt-compiler",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-compiler.zip",
    targets: [
      { name: "*.js*", path: components }
    ]
  },

  {
    name: "bolt-script",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-script.zip",
    targets: [
      { name: "bolt", path: components },
      { name: "jsc", path: components },
      { name: "*.js*", path: components },
      { name: "*.subr", path: components }
    ],
    executables: [
      components + "/jsc",
      components + "/bolt"
    ]
  }
];
