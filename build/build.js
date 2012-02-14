var p = Ent.Project.create('bolt-loader', 'external');
p.setVersion(1, 1, 0);
p.setConfig({
    command: ["make"],
    dist: "gen",
    distInclude: "**/*"
});

