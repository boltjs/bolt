var p = Ent.Project.create('bolt', 'external');
p.setVersion(1, 3, 0);

function getVersionString() {
    var v = p.version;
    return "VERSION=" + [v.major, v.minor, v.point, v.buildNumber].join(".");
}

p.setConfig({
  command: ["make", getVersionString, "GIT_BASE=git://git/bolt/", "--", "clean", "dist"],
    dist: "gen/dist",
    distInclude: "**/*"
});
