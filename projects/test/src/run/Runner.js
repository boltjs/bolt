define(
  'bolt.test.run.Runner',

  [
    'bolt.base.platform.Platform',
    'bolt.test.run.BrowserRunner',
    'bolt.test.run.NodeRunner'

  ],

  function (Platform, BrowserRunner, NodeRunner) {
    return Platform.get(NodeRunner, BrowserRunner)
  }
);
