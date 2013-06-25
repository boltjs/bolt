var blueprints = [];

global.define =  function (id, deps) {
  blueprints.push({ id: id, deps: deps });
};

require("../include/include.js");


var Evaller = bolt.loader.executor.Evaller;

Evaller.execute(
  "true",
  function () { assert(true, "successful eval"); },
  function (error) { assert(false, "successful eval: " + error); }
);

Evaller.execute(
  "mth is wrong",
  function () { assert(false, "failed eval"); },
  function () { assert(true, "failed eval"); }
);

Evaller.execute(
  "define('mth', ['marli'], function () {});",
  function () { assert(blueprints.length === 1 && blueprints[0].id === "mth", "define is called"); },
  function (error) { assert(false, "define is called: " + error); }
);
