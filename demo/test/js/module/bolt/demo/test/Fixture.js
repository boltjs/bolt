define(
  'bolt.demo.test.Fixture',

  [
    'bolt.demo.ModuleA'
  ],

  function (ModuleA) {
    return 'Fixture' + ModuleA;
  }
);
