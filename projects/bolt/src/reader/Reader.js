define(
  'bolt.runtime.reader.Reader',

  [
    'bolt.runtime.reader.BrowserReader',
    'bolt.runtime.reader.NodeReader'
  ],

  function (BrowserReader, NodeReader) {
    var browser = function (configuration, done) {
      configure(BrowserReader.read, configuration, done);
    };

    var node = function (configuration, done) {
      configure(NodeReader.read, configuration, done);
    };

    var configure = function (reader, configuration, done) {
      if (configuration.configs && configuration.configs.length > 0)
        reader('./.', configuration.configs.shift(), done, {
          sources: configuration.sources || [],
          types: configuration.types || [],
          configs: configuration.configs
        });
      else
        done({
          sources: configuration.sources || [],
          types: configuration.types || []
        });
    };

    return {
      browser: browser,
      node: node
    };
  }
);
