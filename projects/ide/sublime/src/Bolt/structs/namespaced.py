import re
from structs.nest import *


def nu(base):

    def dep(filename):
        raw = re.sub("(?P<pre>.*)" + base + "/(?P<package>.+)/(?P<module>.+?)\.js$", "\g<package>.\g<module>", filename)
        return re.sub("/", ".", raw)

    def pattern(word):
        return '' + word + '.js'

    def path(d):
        qualified = dep(d)
        last = qualified.rfind('.')
        if last > -1:
            rest = qualified[:last]
            name = qualified[last + 1:len(qualified)]
            return base + '/' + rest + '/' + name + '.js'
        else:
            return qualified

    return Nest(base, pattern, dep, path)
