// FIX reconsider name, but compiler.compile.compiler.compile() method calls would rock.
compiler.compile.compiler = def(
  [
    compiler.inspect.metalator,
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

    var analyse = function (ids) {
      var results = analyser.analyse(ids, modules);
      if (results.cycle)
        error.die('cycle detected whilst compiling modules: ' + results.cycle.join(' ~> '));
      return results;
    };

    var load = function (sources, id) {
      var spec = sources.load(id);
      renders[id] = spec;
      spec.load(function (id, dependencies) {
        modules[id] = dependencies;
      });
    };
    
    var checkedload = function (sources, id) {
      if (!sources.can(id))
        error.die("Configuration error: no source found to load module: " + id);

      load(sources, id);

      if (modules[id] === undefined)
        error.die('Configuration error: module [' + id + '] was not loaded from expected source');
    };

    var compile = function (sources, ids) {
      var loader = fn.curry(checkedload, sources);
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
