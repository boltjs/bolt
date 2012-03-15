test.report.errors = def(
  [
  ],

  function (timer, namer) {
    var clean = function (e) {
      if (typeof e === 'string')
        return e;
      if (e.name === 'AssertionError')
        return 'Assertion error' + (e.message ? ' [' + e.message + ']' : '') + ': [' + JSON.stringify(e.expected) + '] ' + e.operator + ' [' + JSON.stringify(e.actual) + ']' + stack(e);
      if (e.name && e.message)
        return e.name + ': ' + e.message + stack(e);
      if (e.toString)
        return e.toString() + stack(e);
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
