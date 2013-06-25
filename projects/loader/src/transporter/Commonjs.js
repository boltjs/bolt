bolt.loader.transporter.Commonjs = def(
  [
  ],

  function () {
    var startsWith = function (str, prefix) {
      return str.indexOf(prefix) === 0;
    };

    var fromFile = function (url, success, error) {
      var fs = require('fs');
      fs.exists(url, function (exists) {
        if (exists)
          fs.readFile(url, 'UTF-8', function (err, data) {
            if (err)
              error('Error reading file [' + url + '], error [' + err + ']');
            else
              success(data);
          });
        else
          error('File does not exist [' + url + ']');
      });
    };

    var fromUrl = function (http, url, success, error) {
      http.get(url, function (res) {
        var body = '';
        res.on('data', function (chunk) {
          body += chunk.toString();
        });
        res.on('end', function () {
          success(body);
        });
        res.on('error', function (e) {
          error(e.message);
        });
      });
    };

    var read = function (url, success, error) {
      if (startsWith(url, '//'))
        fromUrl(require('http'), 'http:' + url, success, error);
      else if (startsWith(url, 'http://'))
        fromUrl(require('http'), url, success, error);
      else if (startsWith(url, 'https://'))
        fromUrl(require('https'), url, success, error);
      else
        fromFile(url, success, error);
    };

    return {
      read: read
    };
  }
);
