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
    return function () {
      var modules = {}; // id -> [id]
      var renders = {}; // id -> spec

      var analyse = function (ids) {
        var results = analyser.analyse(ids, modules);
        if (results.cycle)
          error.die('cycle detected whilst compiling modules: ' + results.cycle.join(' ~> '));
        return results;
      };

      var load = function (sources, id, done) {
        var spec = sources.load(id);
        renders[id] = spec;
        spec.load(function (id, dependencies) {
          modules[id] = dependencies;
        }, done);
      };

      var checkedload = function (sources, id, done) {
        if (!sources.can(id))
          error.die('Configuration error: no source found to load module: ' + id);

        load(sources, id, function () {
          if (modules[id] === undefined)
            error.die('Configuration error: module [' + id + '] was not loaded from expected source');
          done();
        });
      };

      var loadAll = function (loader, ids, done) {
        if (ids.length > 0)
          loader(ids.shift(), function () {
            return loadAll(loader, ids, done);
          })
        else
          done();
      };

      var analyseAll = function (loader, ids, done) {
        var results = analyse(ids);
        if (results.load.length > 0)
          loadAll(loader, results.load, function () {
            analyseAll(loader, ids, done);
          })
        else
          done();
      };

      var compile = function (sources, ids, done) {
        var loader = fn.curry(checkedload, sources);
        analyseAll(loader, ids, function () {
          var all = obj.keys(modules);
          var header = metalator.render(all);
          done(header + renderer.render(ids, modules, renders));
        });
      };

      return {
        compile: compile
      };
    };
  }
);
