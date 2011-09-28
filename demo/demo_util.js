var statusMaker = function (type, colour) {
  return function (element, message) {
    element.html('<span style="color: ' + colour + ';">[' + type + ']</span> ' + message);
  };
};

var pass = statusMaker('passed', 'green');
var fail = statusMaker('failed', 'red');

var runDemo = function(name, fn) {
  $(document).ready(function() {
    var heading = $('<h3>' + name + '</h3>');
    $('body').append(heading);
    fn();
    blueprints = [];
  });
};

var createOutputElement = function(message) {
  var div = $('<div />');
  $('body').append(div);
  fail(div, message);
  return div;
};

blueprints = [];

ephox = {bolt: {kernel: {define: function (id, deps, definition) {
    blueprints.push({ id: id, deps: deps, definition: definition });
}}}};