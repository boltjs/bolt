var defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}

var instantiate = function (id) {
  var dependencies = defs[id].dependencies;
  var definition = defs[id].definition;
  var instances = [];
  for (var i = 0; i < dependencies.length; ++i)
    instances.push(dem(dependencies[i]));
  defs[id].instance = definition.apply(null, instances);
  if (defs[id] === undefined)
     throw 'required module [' + id + '] is could not be defined (definition function returned undefined)';
};

var def = function (id, dependencies, definition) {
  if (typeof id !== 'string')
    throw 'invalid module definition, module id must be defined and be a string';
  if (dependencies === undefined)
    throw 'invalid module definition, dependencies must be specified';
  if (definition === undefined)
    throw 'invalid module definition, definition function must be specified';
  defs[id] = {
    dependencies: dependencies,
    definition: definition,
    instance: undefined
  };
};

var dem = function (id) {
  if (defs[id] === undefined)
    throw 'required module [' + id + '] is not defined';
  if (defs[id].instance === undefined)
    instantiate(id);
  return defs[id].instance;
};

var req = function (ids, callback) {
  var instances = [];
  for (var i = 0; i < ids.length; ++i)
    instances.push(dem(ids[i]));
  callback.apply(null, callback);
};

