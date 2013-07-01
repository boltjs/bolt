define(
  'bolt.runtime.profile.BrowserProfile',

  [
    'bolt.base.fp.Func',
    'bolt.kernel.modulator.Bolt',
    'bolt.loader.api.ScriptTag',
    'bolt.loader.transporter.Xhr',
    'bolt.runtime.modulator.Library',
  ],

  function (Func, Bolt, ScriptTag, Xhr, Library) {
    return {
      loadfile: Xhr.request,
      loadscript: ScriptTag.load,
      builtins: {
        bolt: Func.curry(Bolt, ScriptTag),
        amd: Func.curry(Bolt, ScriptTag),
        lib: Func.curry(Library, ScriptTag)
      }
    };
  }
);
