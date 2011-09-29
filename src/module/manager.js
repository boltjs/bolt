kernel.module.manager = def(
  [
  ],

  function () {
    var create = function (modulator, onerror) {
      var blueprints = {};
      var modules = {};

      var define = function (id, dependencies, definition) {
        blueprints[id] = {
          id: id,
          dependencies: dependencies,
          definition: definition
        };
      };

      var require = function (ids, callback) {
        // detect cycles
        // find things not loaded
        // load those things
        // find things not created
        // create those things
        // map ids to the things created
        // callback with things
      };

      return {
        define: define,
        require: require
      };
    };

    return {
      create: create
    };
  }
);
