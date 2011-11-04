var blueprints = [];

global.define =  function (id, deps) {
  blueprints.push({ id: id, deps: deps });
};

require("../include/include.js");


var evaller = ephox.bolt.loader.executor.evaller;

evaller.execute(
  "true",
  function () { assert(true, "successful eval"); },
  function (error) { assert(false, "successful eval: " + error); }
);

evaller.execute(
  "mth is wrong",
  function () { assert(false, "failed eval"); },
  function () { assert(true, "failed eval"); }
);

evaller.execute(
  "define('mth', ['marli'], function () {});",
  function () { assert(blueprints.length === 1 && blueprints[0].id === "mth", "define is called"); },
  function (error) { assert(false, "define is called: " + error); }
);

