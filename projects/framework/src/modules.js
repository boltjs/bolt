var bootstrap = (function () {
  var modules = {};

  var args = function (id, dependencies) {
    var args = [];
    for (var i = 0; i < dependencies.length; ++i)
      if (modules[dependencies[i]] !== undefined)
        args.push(modules[dependencies[i]]);
      else
        throw 'required module [' + id + '] could not be defined (missing dependency [' + dependencies[i] + '])';
    return args;
  };

  var instantiate = function (id, dependencies, definition) {
    var instance = definition.apply(null, args(id, dependencies));
    if (instance === undefined)
      throw 'required module [' + id + '] could not be defined (definition function returned undefined)';
    return instance;
  };

  var define = function (id, dependencies, definition) {
    if (typeof id !== 'string')
      throw 'invalid module definition, module id must be defined and be a string';
    if (dependencies === undefined)
      throw 'invalid module definition, dependencies must be specified';
    if (definition === undefined)
      throw 'invalid module definition, definition function must be specified';
    modules[id] = instantiate(id, dependencies, definition);
  };

  var demand = function (id) {
    if (modules[id] === undefined)
      throw 'requested module [' + id + '] is not defined';
    return modules[id];
  };

  return {
    demand: demand,
    define: define
  };
})();

var define = bootstrap.define;
var demand = bootstrap.demand;

if (typeof module !== 'undefined' && module.exports)
  module.exports = bootstrap;
