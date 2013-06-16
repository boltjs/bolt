class Plasma:

    def __init__(self, dep, inj):
        self.dep = dep
        self.inj = inj


def plasma_eq(x, y):
    return x.dep == y.dep


UNDERSCORE = Plasma('ephox.wrap.Underscore', '_')
JQUERY = Plasma('ephox.wrap.JQuery', '$')

SPECIAL_PLASMAS = [UNDERSCORE, JQUERY]
