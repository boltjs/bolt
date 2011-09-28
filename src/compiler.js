var initialise = function (libraries) {
    libraries.forEach(require);
};

var blueprints = [];

global['define'] = function (id, dependencies, definition) {
    blueprints.push({id: id, dependencies: dependencies, definition: definition});
};


global['config'] = function () {

};




exports.compile = function (root, config, module, libraries) {
    initialise(libraries);
};
