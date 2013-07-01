define(
  'bolt.runtime.config.Mapper',

  [
  ],

  function () {
    var flat = function (id) {
      return id;
    };

    var hierarchical = function (id) {
      return id.replace(/\./g, '/');
    };

    var namespace = function (name) {
      var idx = name.lastIndexOf('.');
      return idx !== -1 ? name.slice(0, idx) + '/' + name.slice(idx + 1) : name;
    };

    var constant = function (name) {
      return function () {
        return name;
      };
    };

    return {
      flat: flat,
      hierarchical: hierarchical,
      namespace: namespace,
      constant: constant
    };
  }
);
