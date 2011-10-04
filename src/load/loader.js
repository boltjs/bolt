compiler.load.loader = def(
  [
    compiler.core.error,
    compiler.load.evaller,
    ephox.bolt.kernel.module.analyser
  ],

  function (error, evaller, analyser) {
    var analyse = function (store, modules) {
      var dependencies = store.alldependencies();
      var loadables = analyser.analyse(modules, dependencies);
      if (loadables.cycle)
        error.die(30, "cycle detected in dependencies: " + loadables.cycle.join(' -> '));
      return loadables.load;
    };

    var load = function (store, modulator, root, id) {
      if (!modulator.can(id))
        error.die(31, "do not know how to load: " + id);
      if (!store.has(id))
        error.die(32, "module is already defined: " + id);
      var spec = modulator.modulate(id)
      var data = store.save(id, root + '/' + spec.url, spec.wrap)
      evaller.evaluate(store, data);
    };

    return {
      analyse: analyse,
      load: load
    };
  }
);
