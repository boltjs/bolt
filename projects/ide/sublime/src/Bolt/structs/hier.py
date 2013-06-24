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
        rest = re.sub('\.', '/', qualified)
        return base + '/' + rest + '.js'

    return Nest(base, pattern, dep, path)

