import re


def from_file(dir):

    # FIX: generalise this. Move into settings.
    locations = ["src", "lib", "gen", "test", "demo"]

    def pred(loc):
        return dir.find('/' + loc + '/') > -1

    candidates = filter(pred, locations)
    if len(candidates) > 0:
        return re.sub("(?P<project>.*?)/" + candidates[0] + "/(?P<rest>.+)", "\g<project>", dir)
    else:
        return dir
