compiler.core.state = def(
  [
    compiler.core.error,
    ephox.bolt.kernel.fp.object
  ],

  function (error, obj) {
    var create = function () {
      var store = {};

      var define = function (id, dependencies) {
        store[id].dependencies = dependencies;
        store[id].defined = true;
      };

      var alldependencies = function () {
        return obj.map(store, function (k, v) {
          return v.dependencies;
        });
      };

      var dependencies = function (id) {
        if (!store[id])
          error.die(90, 'can not get dependencies for unknown module: ' + id);
        if (!store[id].defined)
          error.die(91, 'can not get dependencies for undefined module: ' + id);
        return store[id].dependencies;
      };

      var specification = function (id) {
        if (!has(id))
          error.die(92, 'can not get dependencies for unknown module: ' + id);
        return store[id];
      };

      var save = function (id, file, wrap) {
        var data = { id: id, file: file, wrap: wrap };
        store[id] = data;
        return data;
      };

      var has = function (id) {
        return store !== undefined;
      };

      var isdefined = function (id) {
        return has(id) && store[id].defined;
      };

      return {
        define: define,
        alldependencies: alldependencies,
        dependencies: dependencies,
        specification: specification,
        save: save,
        has: has,
        isdefined: isdefined
      };
    };

    return {
      create: create
    };
  }
);
