var error = require('./error');
var evaler = require('./evaler.js');

var analyser = ephox.bolt.kernel.module.analyser;

exports.analyse = function (store, modules) {
    var dependencies = store.alldependencies();
    var loadables = analyser.analyse(modules, dependencies);
    if (loadables.cycle) 
        error.die(30, "cycle detected in dependencies: " + loadables.cycle.join(' -> '));
    return loadables.load;
};

exports.load = function (store, modulator, root, id) {
    if (!modulator.can(id))
        error.die(31, "do not know how to load: " + id);
    if (!store.has(id))
        error.die(32, "module is already defined: " + id);
    var spec = modulator.modulate(id)
    var data = store.save(id, root + '/' + spec.url, spec.wrap)
    evaler.evaluate(store, data);
};

