var p = Ent.Project.create('bolt-inline', 'external');
p.setVersion(1, 1, 0);
p.setConfig({
    command: ["make"],
    dist: "gen",
    distInclude: "**/*"
});

