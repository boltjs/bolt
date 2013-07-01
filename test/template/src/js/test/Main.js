define(
  'test.Main',

  [
    'test.ModuleThree'
  ],

  function (ModuleThree) {
    return function () {
      console.log(ModuleThree);
    };
  }
);
