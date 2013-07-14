define(
  'bolt.test.report.Errors',

  [
  ],

  function (timer, namer) {
    var clean = function (e) {
      if (typeof e === 'string')
        return e;
      var s = stack(e);
      if (e.name === 'AssertionError')
        return 'Assertion error' + (e.message ? ' [' + e.message + ']' : '') + ': [' + JSON.stringify(e.expected) + '] ' + e.operator + ' [' + JSON.stringify(e.actual) + ']' + s;
      if (e.name && e.message)
        return s.indexOf(e.name + ': ' + e.message) === 0 ? s : e.name + ': ' + e.message + s;
      if (e.toString)
        return s.indexOf(e.toString()) === 0 ? s : e.toString() + s;
      return JSON.stringify(e) + s;
    };

    var stack = function (e) {
      if (!e.stack)
        return '';
      var lines = e.stack.split('\n').filter(function (line) {
        return line.indexOf('at') !== -1 && line.indexOf('/bolt.js') === -1;
      });
      return '\n' + lines.join('\n');
    };

    return {
      clean: clean
    };
  }
);
