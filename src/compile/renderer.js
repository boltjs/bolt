compiler.compile.renderer = def(
  [
  ],

  function () {
    var render = function (ids, modules, renders) {
      var printed = {};  // url ->  boolean

      var renderer = function (id) {
        var dependencies = modules[id];
        var deps = dependencies.map(renderer);

        if (renders[id] === undefined)
          return deps.join('\n');

        var spec = renders[id];

        if (printed[spec.url])
          return deps.join('\n');

        printed[spec.url] = true;
        return deps.join('\n') + '\n' + spec.render();
      };

      return ids.map(renderer).join('\n') + '\n';
    };

    return {
      render: render
    };
  }
);
