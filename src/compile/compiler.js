// FIX reconsider name, but compiler.compile.compiler.compile() method calls would rock.
compiler.compile.compiler = def(
  [
    compiler.meta.metalator,
    compiler.tools.io,
    compiler.tools.error,
    compiler.compile.renderer,
    ephox.bolt.kernel.module.analyser,
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.kernel.fp.object
  ],

  function (metalator, io, error, renderer, analyser, fn, obj) {
    var modules = {}; // id -> [id]
    var renders = {}; // id -> spec

    var unexpected = fn.curry(error.die, "unexpected call to require, define or demand by compile modulator.");

    var analyse = function (ids) {
      var results = analyser.analyse(ids, modules);
      if (results.cycle)
        error.die('cycle detected whilst compiling modules: ' + results.cycle.join(' ~> '));
      return results;
    };

    var load = function (regulator, id) {
      var spec = regulator.regulate(id, unexpected, unexpected, unexpected);
      renders[id] = spec;
      spec.load(function (id, dependencies) {
        modules[id] = dependencies;
      });
    };
    
    var checkedload = function (regulator, id) {
      if (!regulator.can(id, unexpected))
        error.die("Configuration error: no source found to load module: " + id);

      load(regulator, id);

      if (modules[id] === undefined)
        error.die('Configuration error: module [' + id + '] was not loaded from expected source');
    };

    var compile = function (regulator, ids) {
      var loader = fn.curry(checkedload, regulator);
      var results = analyse(ids);
      while (results.load.length > 0) {
        results.load.forEach(loader);
        results = analyse(ids);
      }
      var all = obj.keys(modules);
      var header = metalator.render(all);
      return header + renderer.render(ids, modules, renders);
    };

    return {
      compile: compile
    };
  }
);
