require("../include/include.js");

var compound = ephox.bolt.compiler.oracle.compound;


var source = function (value) {
  return {
    can: function (id) { return id === value; },
    value: value
  };
};

var sources = [
  source('a'),
  source('b'),
  source('c')
];

var oracle = compound.create(sources);

var checkfound = function (id, message) {
  var r = oracle(id);
  assert(r.found && r.found.value === id, message);
};

var checknotfound = function (id, message) {
  var r = oracle(id);
  assert(r.notfound && r.found === undefined, message);
};

checkfound('a', 'basic find');
checkfound('b', 'some other find');
checkfound('c', 'edge case find');
checknotfound('d', 'not found');
