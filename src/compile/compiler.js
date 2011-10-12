// FIX reconsider name, but compiler.compile.compiler.compile() method calls would rock.
compiler.compile.compiler = def(
  [
    compiler.tools.io,
    compiler.tools.error,
    compiler.compile.loader,
    ephox.bolt.kernel.module.analyser,
    ephox.bolt.kernel.fp.functions
  ],

  function (io, error, loader, analyser, fn) {
    var modules = {};  // id -> [id]
    var rendered = {}; // id -> rendered
    var printed = {};

    var load = function (modulator, id) {
      if (!modulator.can(id))
        error.die(91, "No modulator can load module: " + id);
      var spec = modulator.modulate(id);
      rendered[id] = spec.render();
      spec.load(function (id, dependencies) {
        modules[id] = dependencies;
      });
    };

    var analyse = function (ids) {
      var results = analyser.analyse(ids, modules);
      if (results.cycle)
        error.die(90, 'cycle detected whilst compiling modules: ' + results.cycle.join(' ~> '));
      return results;
    };

    var render = function (ids) {
      var renderer = function (id) {
        if (printed[id])
          return "";
        var dependencies = modules[id];
        var deps = dependencies.map(renderer);
        printed[id] = true;
        return deps.join('\n') + '\n' + rendered[id];
      };
      return ids.map(renderer).join('\n');
    };

    var gather = function (modulator, ids) {
      var loader = fn.curry(load, modulator);
      var results = analyse(ids);
      while (results.load.length > 0) {
        results.load.forEach(loader);
        results = analyse(ids);
      }
      return render(ids);
    };

    var compile = function (modulator, ids, target, targetmeta) {
      var content = gather(modulator, ids);
      io.write(target, content);
      // FIX write targetmeta
    };

    return {
        compile: compile
    };
  }
);
