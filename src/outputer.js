var error = require('./error');
var fs = require('fs');

var identity = function (x) { return x; };

var pipe = function (file, wrap) {
    var data = fs.readFileSync(file, 'UTF-8');
    var wrapped = wrap(data);
    console.log('%s', wrapped);
};

var piper = function (store, id) {
    var dependencies = store.dependencies(id);
    dependencies.forEach(function (id) {
        piper(store, id);
    });
    var spec = store.specification(id);
    pipe(spec.file, spec.wrap || identity);
}

exports.output = function (store, ids) {
    for (var i = 0; i < ids.length; ++i)
        piper(store, ids[i]);
};

