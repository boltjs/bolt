define(
  'bolt.demo.ModuleA',

  [
    'bolt.demo.ModuleB',
    'bolt.demo.ModuleC'
  ],

  function (ModuleB, ModuleC) {
    return 'a';
  }
);
