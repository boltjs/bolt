from structs.find_pattern import *
from shell.files import find, exists, grep
from util import array as arrays
from core.query import plasma as query_plasma


def file_by_dep(base, plasma, nests):
    candidates = map(lambda n: base + '/' + n.path(plasma.dep), nests)
    return exists.check(candidates)


# TODO: Split this up.
def file_by_search(base, nests, name):
    locations = map(lambda x: base + '/' + x.base, nests)

    def searcher(loc):
        return grep.list(loc, name, '*\.min\.js')
    return reduce(lambda x, y: x + y, map(searcher, locations))


def by_dep(base, dep, nests):
    def f(x):
        return FindPattern(base + '/' + x.base, dep, lambda y: y)

    patterns = map(f, nests)
    return _expand(patterns)


def by_inj(base, xs, inj, nests):
    plasma = query_plasma.by_inj(xs, inj)
    if (plasma != None):
        by_dep(base, plasma.dep, nests)


def search(base, inj, nests):
    patterns = _search_for_inj(base, inj, nests)
    return _expand(patterns)


def _expand(xs):
    def finder(p):
        files = find.list(p.dir, p.pattern)
        return map(p.extract_dep, files)

    candidates = reduce(lambda x, y: x + y, map(finder, xs))
    return arrays.unique(candidates)


def _search_for_inj(base, inj, nests):
    def f(x):
        return FindPattern(base + '/' + x.base, x.pattern(inj), x.dep)

    return map(f, nests)
