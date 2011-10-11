require('../include/include.js');

var js = ephox.bolt.kernel.modulator.js;

var loader = {
  load: function () {}
};

var id = function (x) { return x; };

var modulator = js.create(id, 'lib', 'some/path', loader);

assert(modulator.can('js!lib:a.js'), "matching type and prefix");
assert(!modulator.can('whatever!lib:a.js'), "mismatch in type");
assert(!modulator.can('js!libx:a.js'), "mismatch in prefix");

assert(modulator.modulate("js!lib:a.js").url === "some/path/a.js", "url includes path and file");


