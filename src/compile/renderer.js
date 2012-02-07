compiler.compile.renderer = def(
  [
    ephox.bolt.kernel.fp.array
  ],

  function (ar) {
    var stripempty = function (ss) {
      return ar.filter(ss, function (s) {
         return s !== '';
      });
    };

    var join = function (ss) {
      return stripempty(ss).join('\n');
    };

    var render = function (ids, modules, renders) {
      var printed = {};  // url ->  boolean

      var renderer = function (id) {
        var dependencies = modules[id];
        var deps = dependencies.map(renderer);

        if (renders[id] === undefined)
          return join(deps);

        var spec = renders[id];

        if (printed[spec.url])
          return join(deps);

        printed[spec.url] = true;
        return join(deps) + '\n' + spec.render();
      };

      return join(ids.map(renderer)) + '\n';
    };

    return {
      render: render
    };
  }
);
