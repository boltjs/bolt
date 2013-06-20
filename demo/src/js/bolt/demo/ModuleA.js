define(
  'bolt.demo.ModuleA',

  [
    'bolt.demo.ModuleB',
    'bolt.demo.ModuleC',
    'JQuery'
  ],

  function (ModuleB, ModuleC, $) {
    return 'a';
  }
);
