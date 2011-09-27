var ephox = global.ephox = global.ephox || {};
var bolt = ephox.bolt = ephox.bolt || {};

var def = function (deps, factory) {
    return factory.apply(null, deps);
};
