module.modulator.amd = def(
  [
    ephox.bolt.kernel.modulator.amd,
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.loader.api.scripttag
  ],

  function (amd, fp, scripttag) {
    var dev = function (id) {
      return id.replace(/\./g, '/') + '.js';
    };

    var create = function (pather, namespace, path, transformer) {
      return amd.create(pather, namespace, path, transformer || dev, scripttag);
    };

    return {
      create: create
    };
  }
);
