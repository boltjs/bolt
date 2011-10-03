var error = require('./error');

exports.load = function (file) {
    var modulator;

    global.configure = function (x) {
        modulator = x;
        return {};
    };

    require(file);

    if (modulator === undefined)
        error.die(20, 'configuration did not contain define a modulator in file: ' + file);

    delete global.configure;

    return modulator;
};
