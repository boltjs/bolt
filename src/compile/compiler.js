// FIX reconsider name, but compiler.compile.compiler.compile() method calls would rock.
compiler.compile.compiler = def(
  [
    compiler.meta.metalator,
    compiler.tools.io,
    compiler.tools.error,
    ephox.bolt.kernel.module.analyser,
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.kernel.fp.object
  ],

  function (metalator, io, error, analyser, fn, obj) {
    var modules = {};  // id -> [id]
    var rendered = {}; // id -> rendered
    var printed = {};

    var unexpected = fn.curry(error.die, "unexpected call to require, define or demand by compile modulator.");

    var load = function (regulator, id) {
      if (!regulator.can(id, unexpected))
        error.die("No modulator can load module: " + id);
      var spec = regulator.regulate(id, unexpected, unexpected, unexpected);
      spec.load(function (id, dependencies) {
        modules[id] = dependencies;
        rendered[id] = "";
      });
      rendered[id] = spec.render();
    };

    var analyse = function (ids) {
      var results = analyser.analyse(ids, modules);
      if (results.cycle)
        error.die('cycle detected whilst compiling modules: ' + results.cycle.join(' ~> '));
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

    var compile = function (regulator, ids) {
      var loader = fn.curry(load, regulator);
      var results = analyse(ids);
      while (results.load.length > 0) {
        results.load.forEach(loader);
        results = analyse(ids);
      }
      return render(ids);
    };

    var write = function (regulator, ids, target) {
      var header = metalator.render(ids);
      var content = compile(regulator, ids);
      io.write(target, header + content);
      return obj.keys(rendered);
    };

    return {
      compile: compile,
      write: write
    };
  }
);
