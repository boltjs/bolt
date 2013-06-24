runDemo('Executor - Injector', function () {
  var injector = createOutputElement('injector test did not run');

  ephox.bolt.loader.executor.injector.execute(
    "define('injector_test', ['some_dep'], function () {});",
    function () {
      if (blueprints.injector_test.id === 'injector_test' && blueprints.injector_test.deps[0] === 'some_dep')
        pass(injector, 'define was called from injector');
      else
        fail(injector, 'define was not called from injector');
    },
    function (message) {
      fail(injector, message);
    }
  );
});