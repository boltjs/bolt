kernel.api.regulator = def(
  [
    kernel.fp.array,
    kernel.fp.object,
    kernel.modulator.globalator
  ],

  function (ar, obj, globalator) {
    var create = function (types_, sourcespecs_) {
      var types = {}; // { type: { id: string, instance: source} }
      var sourcespecs = sourcespecs_.slice(0);
      var sources = [ globalator.create() ];
      obj.merge(types, types_);

      var determinetype = function (id) {
        var index = id.indexOf('!');
        return index === -1 ? 'amd' : id.substring(0, index);
      };

      var resolved = function (type) {
        if (type === 'global')
          return true;
        if (types[type] === undefined)
          throw 'Unknown modulator typez [' + type + '].';
        return types[type].instance !== undefined;
      };

      var unresolved = function (type) {
        return !resolved(type);
      };

      var idfor = function (type) {
        if (types[type] === undefined)
          throw 'Unknown modulator typex [' + type + '].';
        return types[type].id;
      };

      var instancefor = function (type) {
        if (types[type] === undefined)
          throw 'Unknown modulator typexx [' + type + '].';
        return types[type].instance;
      };

      var register = function (type, instance) {
        types[type].instance = instance;
      };

      var sourcify = function () {
        var left = [];
        ar.each(sourcespecs, function (spec) {
          if (resolved(spec.type)) {
            var instance = instancefor(spec.type);
            var source = instance.create.apply(null, spec.args);
            sources.push(source);
          } else
            left.push(spec);
        });
        sourcespecs = left;
      };

      var find = function (id, define, require, demand) {
        for (var i = 0; i < sources.length; ++i)
          if (sources[i].can(id))
            return { found: sources[i].get(id, define, require, demand) };
        return { notfound: true };
      };

      var process = function (ids,  define, require, demand, onsuccess, onerror) {
        var r = [];
        for (var i = 0; i < ids.length; ++i) {
          var source = find(ids[i], define, require, demand);
          if (source.notfound) {
            onerror('Could not find source for module [' +  ids[i] + ']');
            return;
          } else {
            var spec = source.found;
            spec.id = ids[i];
            r[i] = spec;
          }
        }
        onsuccess(r);
      };

      var regulate = function (ids, define, require, demand, onsuccess, onerror) {
        sourcify();
        var required = ar.map(ids, determinetype);
        var needed = ar.filter(required, unresolved);
        var modulatorids = ar.map(needed, idfor);
        if (needed.length === 0)
          process(ids,  define, require, demand, onsuccess, onerror);
        else
          require(modulatorids, function (/* modulators */) {
            var modulators = arguments;
            ar.each(needed, function (type, i) {
               register(type, modulators[i]);
            });
            regulate(ids, define, require, demand, onsuccess, onerror);
          });
      };

      return {
        regulate: regulate
      };
    };

    return {
      create: create
    };
  }
);
