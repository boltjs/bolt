module.bootstrap.install = def(
  [
    module.config.config,
    module.config.specs,
    module.mapper.mapper,
    module.bootstrap.deferred,
    module.bootstrap.main,
    module.runtime,
    ephox.bolt.kernel.fp.array,
    ephox.bolt.kernel.fp.functions
  ],

  // FIX split, sort functionality between config.configure and here.
  function (config, specs, mapper, deferred, main, runtime, ar, fn) {
    var install = function (pather) {
      var configure = function (configuration) {
        var modulatorids = ar.map(configuration.modulators || [], function (spec) {
          return spec.modulator;
        });
        var builtins = [
          'global!ephox.bolt.module.modulator.amd',
          'global!ephox.bolt.module.modulator.js',
          'global!ephox.bolt.module.modulator.compiled'
        ];
        var bolt = config.configure(configuration, pather);
        
        runtime.define = bolt.define;
        runtime.require = function (ids, callback) {
          bolt.require(builtins.concat(modulatorids), function () {
            bolt.require(ids, callback);
          });
        };
        runtime.demand = bolt.demand;

        deferred.configured(runtime.require);
      };

      var main = function (id) {
        runtime.require([id], fn.apply);
      };

      runtime.configure = configure;
      runtime.source = specs.source;
      runtime.modulator = specs.modulator;
      runtime.mapper = mapper;
      runtime.require = deferred.require;
      runtime.main = main;
    };

    return {
      install: install
    };
  }
);
