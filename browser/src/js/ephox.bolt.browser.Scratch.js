define(
  'ephox.bolt.browser.Scratch',

  [
    'global!ephox.bolt.browser.getscratch'
  ],

  function (getscratch) {
    return {
      get: getscratch
    };
  }
);
