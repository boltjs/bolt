loader.transporter.xhr = def(
  [
  ],

  function () {
    var request = function() {
        // FIX is there really a need to look at all these MS impls?
        var factories = [
            function () {return new XMLHttpRequest()},
            function () {return new ActiveXObject("Msxml2.XMLHTTP")},
            function () {return new ActiveXObject("Msxml3.XMLHTTP")},
            function () {return new ActiveXObject("Microsoft.XMLHTTP")}
        ];
  
        for (var i = 0; i < factories.length; ++i) {
            try {
                return factories[i]();
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
      var req = request();
      if (req)
        ajax(req, url, success, error);
      else
        error('Transport error: browser does not support XMLHttpRequest.');
    };
  }
);
