module.modulator.js = def(
  [
    ephox.bolt.kernel.modulator.js,
    ephox.bolt.loader.api.scripttag
  ],

  function (js, scripttag) {
    var create = function (pather, prefix, path) {
      return js.create(pather, prefix, path, scripttag);
    };

    return {
      create: create
    };
  }
);
