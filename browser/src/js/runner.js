(function (global) {
  global.ephox = global.ephox || {};
  global.ephox.bolt = global.ephox.bolt || {};
  global.ephox.bolt.browser = global.ephox.bolt.browser || {};
  var api = global.ephox.bolt.browser;

  var testconfig = '';     // set during loadtests, for global config to use.
  var testscratch = null;  // set per test, private dom scratch area for the current test to use.

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

  var browsersource = function () {
    return {
      args: [ function (path) { return '/' + path; }, 'ephox.bolt.browser', 'js', function (id) { return id; } ],
      relativeTo: '/',
      type: 'bolt'
    };
  };

  var reader = function (done) {
    browser.read('/.', 'project/' + testconfig, function (data) {
      data.sources = [ browsersource() ].concat(data.sources);
      done(data);
    });
  };

  var reporter = (function () {
    var initial = new Date();
    var starttime, el, marker, testfile, name, error, time;

    var test = function (testcase, name) {
      var starttime = new Date();
      var el = $('<div />').addClass('test running');

      var output = $('<div />').addClass('output');
      var marker = $('<span />').text('[running]').addClass('result');
      var testfile = $('<span />').text(testcase).addClass('testfile');
      var name = $('<span />').text(name).addClass('name');
      var error = $('<span />').addClass('error-container');
      var time = $('<span />').addClass('time');
      output.append(marker, ' ', name, ' [', time, '] ', error, ' ', testfile);

      var scratch = $('<div />').addClass('scratch');

      el.append(output, scratch);
      $('body').append(el);

      testscratch = scratch.get(0);  // intentional, see top of file for var decl.

      var pass = function () {
        el.addClass('passed').removeClass('running');
        marker.text('[passed]').addClass('passed');
        time.text(timer.elapsed(starttime));
      };

      var fail = function (e) {
        el.addClass('failed').removeClass('running');
        marker.text('[failed]').addClass('failed');
        // Don't use .text() as it strips out newlines in IE, even when used
        // on a pre tag.
        error.append('<pre class="error">' + htmlentities(errors.clean(e)) + '</pre>');
        time.text(timer.elapsed(starttime));
      };

      return {
        pass: pass,
        fail: fail
      };
    };

    var done = function () {
      $('body').append('<div class="done">Test run completed in <span class="time">' + timer.elapsed(initial) + '</span></div>');
    };

    return {
      test: test,
      done: done
    };
  })();

  var htmlentities = function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  var runtest = test.create(builtins, load, loadscript, reporter, reader);

  var bomb = function () {
    report('all-tests', 'all-tests').fail('error loading tests');
  };

  api.loadtests = function (data) {
    testconfig = data.config;  // intentional, see top of file for var decl.
    var scripts = data.scripts;
    var loop = function () {
      if (scripts.length > 0) {
        var testfile = '/project/' + scripts.shift();
        accumulator.register(testfile, wrapper.sync, wrapper.async);
        loadscript(testfile, loop, bomb);
      } else
        accumulator.drain(runtest, reporter.done);
    };
    loop();
  };

  api.testrunner = function () {
    $.ajax({
      url: '/harness/',
      dataType: 'json',
      success: api.loadtests,
      error: bomb
    });
  };

  api.getscratch = function () {
    return testscratch;
  };
})(Function('return this;')());

