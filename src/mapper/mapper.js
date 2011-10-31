module.mapper.mapper = def(
  [
  ],

  function () {
    var flat = function (id) {
      return id + '.js';
    };

    var hierarchical = function (id) {
      return id.replace(/\./g, '/') + '.js';
    };

    var hyphenated = function (id) {
      return id.replace(/\./g, '-') + '.js';
    };

    return {
      flat: flat,
      hierarchical: hierarchical,
      hyphenated: hyphenated
    };
  }
);
