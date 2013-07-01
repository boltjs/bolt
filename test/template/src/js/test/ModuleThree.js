define(
  'test.ModuleThree',

  [
    'test.ModuleOne',
    'test.ModuleTwo'
  ],

  function (ModuleOne, ModuleTwo) {
    return ModuleOne + ModuleTwo;
  }
);
