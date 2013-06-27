bolt.module.reader.Bouncing = def(
  [
    bolt.kernel.fp.Arr,
    bolt.module.error.Error,
    bolt.module.config.Specs
  ],

  function (Arr, Error, Specs) {
    var bounce = function (done, read, acc) {
      var next = acc.configs.shift();
      read(next.relativeto, next.config, done, acc);
    };

    var tick = function (file, cfg, done, read, acc) {
      var munged = Arr.map(cfg.configs || [], function (config) {
        return { relativeto: file, config: config };
      });
      var accumulated = {
        sources: acc.sources.concat(cfg.sources || []),
        types: acc.types.concat(cfg.types || []),
        configs: munged.concat(acc.configs)
      };
      if (accumulated.configs.length > 0)
        bounce(done, read, accumulated);
      else
        done({ sources: accumulated.sources, types: accumulated.types });
    };

    /*
     * All precedence is depth-first, pre-order. Example:
     *
     *        A
     *       /-\
     *      B   C
     *     /|   |\
     *    D E   F G
     *
     * Configs are read in A, B, D, E, C, F, G.
     *
     * If configs mixed delegation and sources, the
     * sources would be ordered the same: A, B, D, E, C, F, G.
     */

    var evaluate = function (file, payload, done, read, acc) {
      var result = {};
      /* eval scope */
      var mapper = bolt.module.config.Mapper;
      var type = Specs.type;
      var source = Specs.source(file);
      var configure = function (configuration) {
        result = configuration;
      };

      try {
        eval(payload);
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
