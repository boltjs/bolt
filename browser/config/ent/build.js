var p = Ent.Project.create("bolt-browser", "external");
p.setVersion(1, 1, 0);

function getVersionString() {
    var v = p.version;
    return "VERSION=" + [v.major, v.minor, v.point, v.buildNumber].join(".");
}

p.setConfig({
    command: ["make", "-e", getVersionString],
    dist: "gen/dist",
    distInclude: "**/*"
});
