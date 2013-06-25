bolt.test.assert.Assert = def(
  [
    bolt.test.assert.Compare
  ],

  function (Compare) {
    var eq = function (expected, actual, message) {
      var result = Compare.compare(expected, actual);
      if (!result.eq) {
        if (message !== undefined)
          throw new Error(message);
        else
          throw new Error(result.why);
      }
    };

    var throws = function (f, expected, message) {
      var token = {};

      try {
        f();
        throw token;
      } catch (e) {
        if (e === token)
          throw new Error(message);
        if (expected !== undefined)
          eq(expected, e, message);
      }
    };

    var succeeds = function (f, message) {
      try {
        f();
      } catch (e) {
        throw new Error(message);
      }
    };

    var fail = function (message) {
      if (message !== undefined)
        throw new Error(message);
      else
        throw new Error('Test failed.');
    };

    return {
      eq: eq,
      throws: throws,
      succeeds: succeeds,
      fail: fail
    };
  }
);
