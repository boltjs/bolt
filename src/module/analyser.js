kernel.module.analyser = def(
  [
    kernel.fp.array,
    kernel.fp.object
  ],

  function (ar, obj) {
    var UNVISITED = 0;  // Node states
    var INPROGRESS = 1;
    var VISITED = 2;

    var analyse = function(nameToDeps) {
      var graph = {};

      obj.each(nameToDeps, function(name) {
        graph[name] = UNVISITED;
      });

      var load = [];

      try {  // Catch cycles
        obj.each(nameToDeps, function(name) {
          var depLoad = analyseNode(name, nameToDeps, graph);
          load = load.concat(depLoad);
        });
      } catch (e) {
        if (e.cycle) return { cycle : e.cycle };
        throw e;
      }

      return { load : load };
    };

    var analyseNode = function(name, nameToDeps, graph) {
      if (graph[name] === INPROGRESS) {
        throw { cycle : [ name ] };
      }
      graph[name] = INPROGRESS;

      var load = [];

      var deps = nameToDeps[name];

      try {
        ar.each(deps, function(dep) {
          if (graph[dep] === VISITED) return;
          if (nameToDeps[dep] === undefined) {  // Not loaded
            load.push(dep);
            graph[dep] = VISITED;
            return;
          }
          var depLoad = analyseNode(dep, nameToDeps, graph);
          load = load.concat(depLoad);
        });
      } catch (e) {
        throw e.cycle ? { cycle: updateCycle(name, e.cycle) } : e;
      }

      graph[name] = VISITED;

      return load;
    };

    var updateCycle = function(name, cycle) {
      var cycleComplete = cycle.length > 1 && cycle[0] === cycle[cycle.length - 1];
      return (cycleComplete) ? cycle : [ name ].concat(cycle);
    };

    return {
      analyse: analyse
    };
  }
);
