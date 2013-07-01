define(
  'bolt.runtime.entry.Main',

  [
    'bolt.base.platform.Platform',
    'bolt.runtime.entry.BrowserMain',
    'bolt.runtime.entry.NodeMain'
  ],

  function (Platform, BrowserMain, NodeMain) {
    return Platform.get(NodeMain, BrowserMain);
  }
);
