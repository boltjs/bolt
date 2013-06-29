module.exports = (function () {
  var fs = require('fs');

  var read = function (project_json) {
    if (fs.existsSync(project_json) && fs.statSync(project_json).isFile()) {
      try {
        return JSON.parse(fs.readFileSync(project_json));
      } catch (e) {
        fail(1, 'could not read project configuration from [' + project_json + ']: ' + e);
      }
    }
    return {};
  };

  return {
    read: read
  };
})();
