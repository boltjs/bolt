define(
  'bolt.test.run.Config',

  [
    'bolt.base.fp.Func',
    'bolt.base.fp.Obj',
    'bolt.base.util.Path'
  ],

  function (Func, Obj, Path, Mapper, Specs) {
    var sources = function (testfile, replacements) {
      var r = [];
      Obj.each(replacements, function (i, o) {
        var name = Path.basename(o);
        var source = {
          type: 'bolt',
          relativeto: testfile,
          args: [ i, Path.dirname(o), Func.constant(name) ]
        }
        r.push(source);
      });
      return r;
    };

    return {
      sources: sources
    };
  }
);
