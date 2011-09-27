var ephox = global.ephox = global.ephox || {};
var bolt = ephox.bolt = ephox.bolt || {};
var loader = bolt.loader = bolt.loader || {};

var def = function (deps, factory) {
    return factory.apply(null, deps);
};
