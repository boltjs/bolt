compiler.compile.metalator = def(
  [
    compiler.tools.io
  ],

  function (io) {
    var metalate = function (ids, target) {
      var content = JSON.stringify(ids);
      io.write(target, content);
    };

    return {
      metalate: metalate
    };
  }
);
