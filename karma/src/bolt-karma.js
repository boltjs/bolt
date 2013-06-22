__karma__.loaded = function() {};

var tests = Object.keys(__karma__.files).filter(function (file) {
      return /Test\.js$/.test(file);
});

var install = ephox.bolt.module.bootstrap.install;
var load = ephox.bolt.loader.transporter.xhr.request;
var loadscript = ephox.bolt.loader.api.scripttag.load;
var builtins = ephox.bolt.module.config.builtins.browser;
var browser = ephox.bolt.module.reader.browser;
var timer = ephox.bolt.test.report.timer;
var accumulator = ephox.bolt.test.run.accumulator;
var test = ephox.bolt.test.run.test;
var wrapper = ephox.bolt.test.run.wrapper;
var errors = ephox.bolt.test.report.errors;
var source = ephox.bolt.module.config.specs.source('/base/');
var mapper = ephox.bolt.module.config.mapper;
var fn = ephox.bolt.kernel.fp.functions;
var reader = fn.curry(browser.read, '/base/', './config/bolt/test.js');
var karma = __karma__;

var reporter = (function () {
  var test = function (testcase, name) {
    var start = new Date().getTime();

    var pass = function () {
      var result = {
        id: testcase + "#" + name,
        description: testcase + "#" + name,
        suite: [],
        success: true,
        skipped: 0,
        time: new Date().getTime() - start,
        log: []
      };
      karma.result(result);
    };

    var fail = function () {
      var result = {
        id: testcase + "#" + name,
        description: testcase + "#" + name,
        suite: [],
        success: false,
        skipped: 0,
        time: new Date().getTime() - start,
        log: []
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
