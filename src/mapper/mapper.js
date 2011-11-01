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

    var constant = function (name) {
      return function (id) {
        return name;
      };
    };

    return {
      flat: flat,
      hierarchical: hierarchical,
      constant: constant
    };
  }
);
