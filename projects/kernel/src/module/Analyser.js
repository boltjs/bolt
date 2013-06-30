/**
 * This module performs dependency analysis of strings that depend on sets of
 * strings.
 *
 * The input is an array of root strings to start analysis from, and an object
 * that contains a mapping of each string to the strings it depends on.
 *
 * Performing an analysis results in either:
 *   1. an empty array, indicating that all dependencies are satisfied,
 *   2. an array of strings that are, at the minimum, still needed in order to
 *      satisfy the given dependency trees, or
 *   3. an array of strings that form a dependency cycle.
 */
bolt.kernel.module.Analyser = def(
  [
    bolt.base.fp.Arr
  ],

  function (Arr) {
    var collect = function (path, name) {
      var i = Arr.indexof(path, name);
      var p = path.slice(i);
      return p.concat([name]);
    };

    /**
     * @param {array} roots Contains a list of root ids
     * @param {object} modules Contains dependency information in format: { id: [ 'id1', 'id2' ] }
     */
    var analyse = function (roots, modules) {
      var done = {};
      var path = [];
      var missing = [];
      var cycle;

      var children = function (name) {
        Arr.each(modules[name], attempt);
      };

      var examine = function (name) {
        if (modules[name])
          children(name);
        else
          missing.push(name);
      };

      var descend = function (name) {
        path.push(name);
        examine(name);
        path.pop();
      };

      var decycle = function (name) {
        if (Arr.contains(path, name))
          cycle = collect(path, name);
        else
          descend(name);
      };

      var attempt = function (name) {
        if (!done[name]) {
          decycle(name);
          done[name] = true;
        }
      };

      Arr.each(roots, attempt);

      return cycle ? { cycle: cycle } : { load: missing };
    };

    return {
      analyse: analyse
    };
  }
);
