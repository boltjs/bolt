module.modulator.js = def(
  [
    ephox.bolt.kernel.modulator.js,
    ephox.bolt.loader.api.scripttag
  ],

  function (js, scripttag) {
    var create = function (prefix, path) {
      return js.create(prefix, path, scripttag);
    };

    return {
      create: create
    };
  }
);
