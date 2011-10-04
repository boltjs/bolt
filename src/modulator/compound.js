kernel.modulator.compound = def(
  [
  ],

  function () {
    var create = function (delegates) {
      var can = function (id) {
        for (var i = 0; i < delegates.length; ++i)
          if (delegates[i].can(id))
            return true;
        return false;
      };

      var modulate = function (id) {
        for (var i = 0; i < delegates.length; ++i)
          if (delegates[i].can(id))
            return delegates[i].modulate(id);
        throw 'assertion error: can should be used to validate before calls to modulate'
      };

      return {
        can: can,
        modulate: modulate
      };
    };

    return {
      create: create
    };
  }
);
