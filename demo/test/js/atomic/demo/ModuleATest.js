test('some example', [ 'bolt.demo.ModuleA', 'bolt.demo.test.Fixture' ], function (ModuleA, Fixture) {
  assert.eq(Fixture, 'Fixturea', 'Problem with fixutre!');
  assert.eq(ModuleA, 'a', 'Problem with dependency!');

  assert.eq({ test: 'blah', someKey: [ 'house', 'car'], hello: true },
            { test: 'blah', someKey: [ 'house', 'car'], hello: true });

  assert.throws(function () { throw 'Some exception'; }, 'Some exception', 'Exception did not happen!');

  assert.succeeds(function () { }, 'Exception happened!');
});
