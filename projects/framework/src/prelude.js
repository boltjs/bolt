var bolt = scope.bolt = scope.bolt || {};

var def = function (deps, factory) {
    return factory.apply(null, deps);
};
