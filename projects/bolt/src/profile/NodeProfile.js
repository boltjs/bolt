define(
  'bolt.runtime.profile.NodeProfile',

  [
    'bolt.base.fp.Func',
    'bolt.kernel.modulator.Bolt',
    'bolt.loader.api.NodeEvaller',
    'bolt.loader.transporter.Node',
    'bolt.runtime.modulator.Library',
  ],

  function (Func, Bolt, NodeEvaller, Node, Library) {
    return {
      loadfile: Node.request,
      loadscript: NodeEvaller.load,
      builtins: {
        bolt: Func.curry(Bolt, NodeEvaller),
        amd: Func.curry(Bolt, NodeEvaller),
        lib: Func.curry(Library, NodeEvaller)
      }
    };
  }
);
