module.exports = (function () {
  var fs = require('fs');

  var read = function (project_file, onerror) {
    if (fs.existsSync(project_file) && fs.statSync(project_file).isFile()) {
      try {
        return JSON.parse(fs.readFileSync(project_file));
      } catch (e) {
        onerror(1, 'could not read project configuration from [' + project_file + ']: ' + e);
      }
    }
    return {};
  };

  return {
    read: read
  };
})();
