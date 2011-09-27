(function(global) {
    var ephox = global.ephox = global.ephox || {};
    var bolt = ephox.bolt = {};
    var module = bolt.module = {};

    var def = function (deps, factory) {
        return factory.apply(null, deps);
    };
