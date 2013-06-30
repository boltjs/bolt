bolt.compiler.compile.Compiler = def(
  [
    bolt.compiler.inspect.Metalator,
    bolt.compiler.tools.Error,
    bolt.compiler.compile.Renderer,
    bolt.kernel.module.Analyser,
    bolt.base.fp.Func,
    bolt.base.fp.Obj
  ],

  function (Metalator, Error, Renderer, Analyser, Func, Obj) {
    return function () {
      var modules = {}; // id -> [id]
      var renders = {}; // id -> spec

      var analyse = function (ids) {
        var results = Analyser.analyse(ids, modules);
        if (results.cycle)
          Error.die('cycle detected whilst compiling modules: ' + results.cycle.join(' ~> '));
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
          Error.die('Configuration error: no source found to load module: ' + id);

        load(sources, id, function () {
          if (modules[id] === undefined)
            Error.die('Configuration error: module [' + id + '] could not be loaded, check module id.');
          done();
        });
      };

      var loadAll = function (loader, ids, done) {
        if (ids.length > 0)
          loader(ids.shift(), function () {
            return loadAll(loader, ids, done);
          });
        else
          done();
      };

      var analyseAll = function (loader, ids, done) {
        var results = analyse(ids);
        if (results.load.length > 0)
          loadAll(loader, results.load, function () {
            analyseAll(loader, ids, done);
          });
        else
          done();
      };

      var compile = function (sources, ids, done) {
        var loader = Func.curry(checkedload, sources);
        analyseAll(loader, ids, function () {
          var all = Obj.keys(modules);
          var header = Metalator.render(all);
          done(header + Renderer.render(ids, modules, renders));
        });
      };

      return {
        compile: compile
      };
    };
  }
);
