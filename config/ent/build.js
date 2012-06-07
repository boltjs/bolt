var p = Ent.Project.create('bolt', 'external');
p.setVersion(1, 2, 0);

function getVersionString() {
    var v = p.version;
    return "VERSION=" + [v.major, v.minor, v.point, v.buildNumber].join(".");
}

p.setConfig({
  command: ["make", "-e", getVersionString, "GIT_BASE=git://git/bolt/", "--", "cleandist"],
    dist: "gen/dist",
    distInclude: "**/*"
});
