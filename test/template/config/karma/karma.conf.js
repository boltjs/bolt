basePath = '../..';

files = [
  '../../../gen/image/bolt-local/lib/bolt.js',
  '../../../gen/image/bolt-local/lib/test.js',
  '../../../gen/image/bolt-local/lib/bolt-karma.js',
  {pattern: 'config/bolt/*.js', included: false},
  {pattern: 'src/js/**/*.js', included: false},
  {pattern: 'test/node/**/*Test.js', included: false}
];

exclude = [

];

reporters = ['progress', 'coverage'];
preprocessors = {
  '../../../gen/image/bolt-local/lib/bolt.js': 'coverage'
};
port = 9876;
runnerPort = 9100;
colors = true;
logLevel = LOG_INFO; // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
autoWatch = true;
browsers = ['PhantomJS'];
captureTimeout = 5000;
singleRun = false;
