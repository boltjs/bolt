__karma__.loaded = function() {};

var tests = Object.keys(__karma__.files).filter(function (file) {
      return /Test\.js$/.test(file);
});

var install = bolt.module.bootstrap.Install;
var load = bolt.loader.transporter.Xhr.request;
var loadscript = bolt.loader.api.ScriptTag.load;
var builtins = bolt.module.config.Builtins.browser;
var browser = bolt.module.reader.Browser;
var timer = bolt.test.report.Timer;
var accumulator = bolt.test.run.Accumulator;
var test = bolt.test.run.Test;
var wrapper = bolt.test.run.Wrapper;
var errors = bolt.test.report.Errors;
var source = bolt.module.config.Specs.source('/base/');
var mapper = bolt.module.config.Mapper;
var fn = bolt.kernel.fp.Func;
var reader = fn.curry(browser.read, '/base/', './config/bolt/test.js');
var karma = __karma__;

var reporter = (function () {
  var test = function (testcase, name) {
    var start = new Date().getTime();

    var pass = function () {
      var result = {
        id: testcase + "#" + name,
        description: testcase + "#" + name,
        suite: [testcase + "#" + name],
        success: true,
        skipped: 0,
        time: new Date().getTime() - start,
        log: []
      };
      karma.result(result);
    };

    var fail = function (error) {
      var result = {
        id: testcase + "#" + name,
        description: testcase + "#" + name,
        suite: [testcase + "#" + name],
        success: false,
        skipped: 0,
        time: new Date().getTime() - start,
        log: [errors.clean(error)]
      };
      karma.result(result);
    };

    return {
      pass: pass,
      fail: fail
    };
  };

  var done = function () {
    karma.complete({
      coverage: window.__coverage__
    });
    karma.start();
  };

  return {
    test: test,
    done: done
  };
})();

var runtest = test.create(builtins, load, loadscript, reporter, reader);

var bomb = function () {
  console.log("bad");
  karma.start();
};

var loop = function () {
  if (tests.length > 0) {
    var testfile = tests.shift();
    accumulator.register(testfile, wrapper.sync, wrapper.async);
    loadscript(testfile, loop, bomb);
  } else
    accumulator.drain(runtest, reporter.done);
};

karma.info({total: tests.length})
loop();
