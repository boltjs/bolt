require("../include/include.js");

var Renderer = demand('boltc.compile.Renderer');

var constant = function (s) {
  return function () {
    return s;
  }
};

var ids = ['a'];
var modules = {
  a: ['b', 'c'],
  b: ['c'],
  c: []
};
var compiled = constant('c\nb\na');
var compiled_render = {
  a: {
    url: 'a.js',
    render: compiled
  },
  b: {
    url: 'a.js',
    render: compiled
  },
  c: {
    url: 'a.js',
    render: compiled
  }
};

var module_render = {
  a: {
    url: 'a.js',
    render: constant('a')
  },
  b: {
    url: 'b.js',
    render: constant('b')
  },
  c: {
    url: 'c.js',
    render: constant('c')
  }
};

var partial_render = {
  a: {
    url: 'a.js',
    render: compiled
  }
};

var expected = "cba";
var render = function (data) {
  var x = Renderer.render(ids, modules, data);
  return x.replace(/\n/g, '');
};

assert(render(compiled_render) === expected, "render from same source");
assert(render(module_render) === expected, "render from different source");
assert(render(partial_render) === expected, "render from partial source");
