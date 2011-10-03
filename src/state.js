var error = require('./error');
var obj = ephox.bolt.kernel.fp.object;

var store = {};

exports.define = function (id, dependencies) {
    store[id].dependencies = dependencies;
    store[id].defined = true;
};

exports.alldependencies = function () {
    return obj.map(store, function (k, v) {
        return v.dependencies;
    })
};

exports.dependencies = function (id) {
    if (!store[id])
        error.die(90, 'can not get dependencies for unknown module: ' + id);
    if (!store[id].defined)
        error.die(91, 'can not get dependencies for undefined module: ' + id);
    return store[id].dependencies;
};

exports.specification = function (id) {
    if (!exports.has(id))
        error.die(90, 'can not get dependencies for unknown module: ' + id);
    return store[id];
};

exports.save = function (id, file, wrap) {
    var data = {id: id, file: file, wrap: wrap};
    store[id] = data;
    return data;
};

exports.has = function (id) {
    return store !== undefined;
};

exports.isdefined = function (id) {
    return exports.has(id) && store[id].defined;
};
