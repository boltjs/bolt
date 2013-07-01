define(
  'bolt.runtime.error.Error',

  [
  ],

  function () {
    var die = function (msg) {
      throw msg;
    };

    return {
      die: die
    };
  }
);
