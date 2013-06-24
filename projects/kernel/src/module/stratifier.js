kernel.module.stratifier = def(
  [
    kernel.fp.array
  ],

  function (ar) {
    var stratify = function (specs) {
      var parallels = ar.filter(specs, function (spec) {
        return !spec.serial;
      });
      return parallels.length > 0 ? parallels : specs.slice(0, 1);
    };

    return {
      stratify: stratify
    };
  }
);
