var statusMaker = function (type, colour) {
  return function (element, message) {
    element.innerHTML = '<span style="color: ' + colour + ';">[' + type + ']</span> ' + message;
  };
};

var pass = statusMaker('passed', 'green');
var fail = statusMaker('failed', 'red');
