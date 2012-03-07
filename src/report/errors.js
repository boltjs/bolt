test.report.errors = def(
  [
  ],

  function (timer, namer) {
    var clean = function (e) {
      if (typeof e === 'string')
        return e;
      if (e.name && e.name === 'AssertionError')
        return 'Assertion error' + (e.message ? ' [' + e.message + ']' : '') + ': [' + JSON.stringfy(e.expected) + '] ' + e.operator + ' [' + JSON.stringfy(e.actual) + ']' + stack(e);
      return JSON.stringify(e) + stack(e);
    };

    var stack = function (e) {
      if (!e.stack)
        return '';
      var lines = e.stack.split('\n').filter(function (line) {
        return line.indexOf('at') !== -1 &&
          !(line.indexOf('/kernel.js') !== -1 ||
            line.indexOf('/test.js') !== -1);
      });
      return '\n' + lines.join('\n');
    };

    return {
      clean: clean
    };
  }
);
