import re
from structs.nest import *


def nu(base):
    
    def dep(filename):
        return re.sub("(?P<directory>.*)/(?P<filename>.*?)\.js$", "\g<filename>", filename)    
    
    def pattern(word):
        return '*.' + word + '.js'

    def path(d):
        return base + '/' + d + '.js'

    return Nest(base, pattern, dep, path)

