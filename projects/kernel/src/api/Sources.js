bolt.kernel.api.Sources = def(
  [
    bolt.base.fp.Arr,
    bolt.base.fp.Obj,
    bolt.kernel.modulator.Globalator
  ],

  function (Arr, Obj, Globalator) {
    var create = function (builtins, configuration) {
      var data = {
        'global': { instance: Globalator }
      };
      Obj.each(builtins, function (key, value) {
        data[key] = { instance: value };
      });
      Arr.each(configuration.types, function (spec) {
        data[spec.type] = { id: spec.modulator };
      });
      var sourcespecs = configuration.sources.slice(0);
      var sources = [ Globalator.create() ];

      var guard = function (type) {
        if (data[type] === undefined)
          throw 'Unknown modulator type [' + type + '].';
      };

      var isResolved = function (type) {
        guard(type);
        return data[type].instance !== undefined;
      };

      var idOf = function (type) {
        guard(type);
        return data[type].id;
      };

      var instanceOf = function (type) {
        guard(type);
        return data[type].instance;
      };

      var register = function (type, instance) {
        guard(type);
        data[type].instance = instance;
      };

      var find = function (id) {
        for (var i = 0; i < sources.length; ++i)
          if (sources[i].can(id))
            return { found: sources[i] };
        return { notfound: true };
      };

      var crank = function () {
        var left = [];
        Arr.each(sourcespecs, function (spec) {
          if (isResolved(spec.type)) {
            var instance = instanceOf(spec.type);
            var source = instance.create.apply(null, spec.args);
            sources.push(source);
          } else
            left.push(spec);
        });
        sourcespecs = left;
      };

      return {
        isResolved: isResolved,
        idOf: idOf,
        instanceOf: instanceOf,
        register: register,
        find: find,
        crank: crank
      };
    };

    return {
      create: create
    };
  }
);
