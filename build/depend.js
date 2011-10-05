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
      { name: "*.js", path: components }
    ],
    executables: [
      components + "/jsc"
    ]
  }
];
