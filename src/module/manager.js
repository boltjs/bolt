kernel.module.manager = def(
  [
    kernel.fp.iteration,
    kernel.module.loader
  ],

  function (it) {
    var create = function (modulator, onerror) {
      var blueprints = {};
      var modules = {};

      var define = function (id, dependencies, definition) {
        if (blueprints[id] !== undefined)
          onerror("Define error: module '" + id + "' is already defined");
        else
          blueprints[id] = {
            id: id,
            dependencies: dependencies,
            definition: definition
          };
      };

      var require = function (ids, callback) {
        var success = function () {
          var instances = it.map(ids, demand);
          callback.apply(null, instances);
        };
        loader.load(ids, success, onerror);
      };

      // Instantiates a module and all of its dependencies.
      var demand = function (id) {
        if (modules[id] !== undefined)
          return modules[id];
        if (blueprints[id] === undefined)
          throw "module '" + id + "' is not defined";
        var blueprint = blueprints[id];
        var args = it.map(blueprint.dependencies, demand);  // Instantiate dependencies
        var result = blueprint.definition.apply(null, args);  // Instantiate self
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
