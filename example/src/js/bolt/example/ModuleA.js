define(
  'bolt.example.ModuleA',

  [
    'bolt.example.ModuleB',
    'bolt.example.ModuleC'
  ],

  function (ModuleB, ModuleC) {
    return 'a';
  }
);
