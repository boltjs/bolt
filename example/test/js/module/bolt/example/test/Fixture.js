define(
  'bolt.example.test.Fixture',

  [
    'bolt.example.ModuleA'
  ],

  function (ModuleA) {
    return 'Fixture' + ModuleA;
  }
);
