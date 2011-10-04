var p = Ent.Project.create('bolt-module', 'external');
p.setVersion(1, 0, 0);
p.setConfig({
    command: ["make"],
    dist: "gen",
    distInclude: "**/*"
});
