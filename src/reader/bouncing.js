module.reader.bouncing = def(
  [
    module.error.error,
    module.config.specs
  ],

  function (error, specs) {
    var bounce = function (current, done, read, acc) {
      var next = acc.configs.shift();
      read(current, next, done, acc);
    };

    var tick = function (file, cfg, done, read, acc) {
      var accumulated = {
        sources: acc.sources.concat(cfg.sources || []),
        types: acc.types.concat(cfg.types || []),
        configs: acc.configs.concat(cfg.configs || [])
      };
      if (accumulated.configs.length > 0)
        bounce(file, done, read, accumulated);
      else
        done({ sources: accumulated.sources, types: accumulated.types });
    };

    var evaluate = function (file, payload, done, read, acc) {
      var result = {};
      /* eval scope */
      var mapper = module.mapper.mapper;
      var type = specs.type;
      var source = specs.source(file);
      var configure = function (configuration) {
        result = configuration;
      };
      try {
        eval(payload)
      } catch (e) {
        throw 'Could not load configuration [' + file + '], with: ' + e;
      }
      tick(file, result, done, read, acc);
    };

    return {
      evaluate: evaluate
    };
  }
);
