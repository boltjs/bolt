var p = Ent.Project.create('bolt-test', 'external');
p.setVersion(1, 0, 0);
p.setConfig({
    command: ["make"],
    dist: "gen",
    distInclude: "**/*"
});

