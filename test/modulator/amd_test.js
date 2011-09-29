require("../include/include.js");

var amd = ephox.bolt.kernel.modulator.amd;

var idTransformer = function (id) {
  return id.replace(/\./g, '/');
};

var loader = {
  load: function (url, onsuccess, onfailure) {

  }
};

var modulator = amd.create('some.namespace.path', '../../test/path', idTransformer, loader);

assert(modulator.can('some.namespace.path.blah.test'), 'can works for valid id');
assert(!modulator.can('other.namespace.path.blah.test'), 'can does not work for invalid id');