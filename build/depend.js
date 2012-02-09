var components = 'components';

var cleanDirs = [ components ];

var dependencies = [
  {
    name: "bolt-compiler",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-compiler.zip",
    targets: [
      { name: "jsc", path: components },
      { name: "bolt", path: components },
      { name: "*.js*", path: components }
    ],
    executables: [
      components + "/jsc",
      components + "/bolt"
    ]
  },

  {
    name: "bolt-test",
    repository: "buildrepo2",
    version : "latest",
    source: "bolt-test.zip",
    targets: [
      { name: "test", path: components },
      { name: "*.js", path: components }
    ],
    executables: [
      components + "/test"
    ]
  }
];
