var blueprints = [];

global.ephox = {
  bolt: {
    kernel: {
      define: function(id, deps) {
        blueprints.push({ id: id, deps: deps });
      }
    }
  }
};

require("../include/include.js");


var module = ephox.bolt.loader.executor.eval;

module.execute(
  "true",
  function() { assert(true, "successful eval"); },
  function(error) { assert(false, "successful eval: " + error); }
);

module.execute(
  "mth is wrong",
  function() { assert(false, "failed eval"); },
  function() { assert(true, "failed eval"); }
);

module.execute(
  "define('mth', ['marli'], function() {});",
  function() { assert(blueprints.length === 1 && blueprints[0].id === "mth", "define is called"); },
  function(error) { assert(false, "define is called: " + error); }
);