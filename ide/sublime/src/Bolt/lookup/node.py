import re
from structs.node import *
import os


def from_path(nest_dirs, path):
    dir = re.sub("(?P<directory>.*)/(?P<filename>.+)", "\g<directory>", path) if os.path.isfile(path) else path
    package = from_dir(nest_dirs, dir)
    return Node(dir, package)


def from_dir(nest_dirs, dir):
    relevant = filter(lambda n: dir.startswith(n), nest_dirs)
    if (len(relevant) > 0):
        raw = re.sub(relevant[0] + "/(?P<package>.+)", "\g<package>", dir)
        r = re.sub("/", ".", raw)
        return r.rstrip(".")
    else:
        return dir
