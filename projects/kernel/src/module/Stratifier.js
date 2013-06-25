bolt.kernel.module.Stratifier = def(
  [
    bolt.kernel.fp.Arr
  ],

  function (Arr) {
    var stratify = function (specs) {
      var parallels = Arr.filter(specs, function (spec) {
        return !spec.serial;
      });
      return parallels.length > 0 ? parallels : specs.slice(0, 1);
    };

    return {
      stratify: stratify
    };
  }
);
