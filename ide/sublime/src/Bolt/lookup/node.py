import re
from structs.node import *
import os
from lookup import package as lookup_package


def from_path(path):
    dir = re.sub("(?P<directory>.*)/(?P<filename>.+)", "\g<directory>", path) if os.path.isfile(path) else path
    package = lookup_package.from_dir(dir)
    return Node(dir, package)
