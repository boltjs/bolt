import re


def from_dir(dir):
    raw = re.sub("(?P<pre>.*)/ephox/(?P<package>.+)", "ephox/\g<package>", dir)
    r = re.sub("/", ".", raw)
    return r.rstrip(".")
