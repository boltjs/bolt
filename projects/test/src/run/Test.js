define(
  'bolt.test.run.Test',

  [
    'bolt.test.run.Config'
  ],

  function (Config) {
    return function (bolt, reporter, config) {
      return function (next, wrapper, testfile, name, replacements, deps, fn) {
        bolt.reconfigure({
          configs: [
            config
          ],
          sources: Config.sources(testfile, replacements)
        });
        Function('return this;')().define = bolt.define;
        var wrapped = wrapper(bolt, reporter, testfile, name, fn, next);
        bolt.require(deps, wrapped);
      };
    };
  }
);
