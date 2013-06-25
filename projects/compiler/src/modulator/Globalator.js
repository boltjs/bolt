bolt.compiler.modulator.Globalator = def(
  [
  ],

  function () {
    var create = function () {
      var can = function (id) {
        return id.indexOf('global!') === 0;
      };

      var get = function (id) {
        var globalid = id.substring('global!'.length);

        var render = function () {
          return 'bolt.module.api.define("' + id + '", [], function () { return ' + globalid + '; });';
        };

        var load = function (define, done) {
          define(id, []);
          done();
        };

        return {
          url: globalid,
          serial: false,
          render: render,
          load: load
        };
      };

      return {
        can: can,
        get: get
      };
    };

    return {
      create: create
    };
  }
);
