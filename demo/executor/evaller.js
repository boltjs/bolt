runDemo('Executor - Evaller', function () {
  var evaller = createOutputElement('evaller test did not run');

  ephox.bolt.loader.executor.evaller.execute(
    "define('evaller_test', ['some_dep'], function () {});",
    function () {
      if (blueprints.evaller_test.id === 'evaller_test' && blueprints.evaller_test.deps[0] === 'some_dep')
        pass(evaller, 'define was called from evaller');
      else
        fail(evaller, 'define was not called from evaller');
    },
    function (message) {
      fail(evaller, message);
    }
  );
});