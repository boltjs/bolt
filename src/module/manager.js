kernel.module.manager = def(
  [
    kernel.fp.array,
    kernel.fp.object,
    kernel.module.loader,
    kernel.module.fetcher
  ],

  function (ar, obj, loader, fetcher) {
    var create = function (modulator, onerror) {
      var blueprints = {};  // id -> {id: string, dependencies: [string], definition: function}
      var modules = {};     // id -> module

      var define = function (id, dependencies, definition) {
        if (id === undefined)
          onerror("Define error: module id can not be undefined");
        else if (blueprints[id] !== undefined)
          onerror("Define error: module '" + id + "' is already defined");
        else
          blueprints[id] = { id: id, dependencies: dependencies, definition: definition };
      };

      var require = function (ids, callback) {
        var onsuccess = function () {
          var instances = ar.map(ids, demand);
          callback.apply(null, instances);
        };

        var oncontinue = function () {
          var deps = obj.map(blueprints, function (k, v) {
            return v.dependencies;
          });
          loader.load(ids, deps, fetcherer, oncontinue, onsuccess, onerror);
        };

        oncontinue();
      };

      var validator = function (id) { return blueprints[id] !== undefined; };
      var fetcherer = fetcher.create(modulator, validator, onerror, define, require);

      // Instantiates a module and all of its dependencies.
      var demand = function (id) {
        if (modules[id] !== undefined)
          return modules[id];
        if (blueprints[id] === undefined)
          throw "module '" + id + "' is not defined";
        var blueprint = blueprints[id];
        var args = ar.map(blueprint.dependencies, demand);  // Instantiate dependencies
        var result = blueprint.definition.apply(null, args);  // Instantiate self
        if (result === undefined)
          throw "module '" + id + "' returned undefined from definition function";
        modules[id] = result;
        return result;
      };

      return {
        define: define,
        require: require,
        demand: demand
      };
    };

    return {
      create: create
    };
  }
);
