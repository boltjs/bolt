var r = configure(
    ephox.bolt.kernel.modulator.amd.create(
        'example',
        '.',
        function (id) { return id.split('.').join('/') + ".js"; },
        ephox.bolt.loader.api.scripttag
    ), function (message) {
        console.log('fatal error: ', message);
    }
);

var define = r.define;
var require = r.require;
