import re

class TempNest:
    def __init__(self, base, pattern, dep, definition, path):
        self.base = base
        self.pattern = pattern
        self.dep = dep
        self.definition = definition
        self.path = path


def flat(base):
    def dep(filename):
        return re.sub("(?P<directory>.*)/(?P<filename>.*?)\.js$", "\g<filename>", filename)

    def pattern(word):
        return '*.' + word + '.js'

    def path(dependency):
        return base + '/' + dependency + '.js'

    def definition(directory, name):
        return name

    return TempNest(base, pattern, dep, definition, path)


def hierarchy(base):
    def dep(filename):
        raw = re.sub(base + "/(?P<package>.+)/(?P<module>.+?)\.js$", "\g<package>.\g<module>", filename)
        return re.sub("/", ".", raw)

    def pattern(word):
        return word + '.js'

    def path(dependency):
        return re.sub('\.', '/', base + '/' + dependency) + '.js'

    def definition(directory, name):
        raw = re.sub(base + "/(?P<package>.*)", "\g<package>", directory)
        return re.sub("/", ".", raw).rstrip(".") + '.' + name

    return TempNest(base, pattern, dep, definition, path)


