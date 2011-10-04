compiler.load.evaller = def(
  [
    compiler.core.error,
    require('fs')
  ],

  function (error, fs) {
    var requireseval = function (id) {
      return id.indexOf('!') < 0;
    };

    var evaluater = function (store, spec) {
      if (!fs.statSync(spec.file).isFile())
        error.die(40, 'could not load module, ' + spec.id + ', from file: ' + spec.file);
      require(spec.file);
      if (!store.isdefined(spec.id))
        error.die(41, 'module, ' + spec.id + ' was not defined in file: ' + spec.file);
    };

    var evaluate = function (store, spec) {
      if (requireseval(spec.id))
        evaluater(store, spec);
    };

    return {
      evaluate: evaluate
    };
  }
);
