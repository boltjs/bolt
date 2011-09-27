loader.transporter.xhr = def(
  [
  ],

  function () {
    var XMLHttpFactories = [
      function () {return new XMLHttpRequest()},
      function () {return new ActiveXObject("Msxml2.XMLHTTP")},
      function () {return new ActiveXObject("Msxml3.XMLHTTP")},
      function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];
  
    var createXMLHTTPObject = function() {
      for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
          return XMLHttpFactories[i]();
        } catch (e) {
        }
      }
    };

    var handler = function (req, url, success, error) {
      var done = function() {
        if (req.status === 200 || req.status === 304)
          success(req.responseText);
        else
          error('Transport error: ' + req.status + ' ' + req.statusText + ' for resource: "' + url + '"');
      };

      return function () {
        if (req.readyState === 4)
          done();
      };
    };

    var ajax = function (req, url, success, error) {
      req.open('GET', url, true);
      req.onreadystatechange = handler(req, url, success, error);
      req.send();
    };

    return function(url, success, error) {
      var req = createXMLHTTPObject();
      if (req)
        ajax(req, url, success, error);
      else
        error('Transport error: browser does not support XMLHttpRequest.');
    };
  }
);
