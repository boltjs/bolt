module.modulator.basic = def(
  [
    ephox.bolt.kernel.modulator.amd,
    ephox.bolt.kernel.fp.functions,
    ephox.bolt.loader.api.scripttag
  ],

  function (amd, fp, scripttag) {
    var transformer = function (id) {
      return id.replace(/\./g, '/') + '.js';
    };

    var create = function (namespace, path) {
      return amd.create(namespace, path, transformer, scripttag);
    };

    return {
      create: create
    };
  }
);
