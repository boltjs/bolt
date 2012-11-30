from core.query import plasma
from lookup import files as lookup_files
from structs.highlight_list import *
from structs.plasma import *


def all(base, nests, plasmas, spots):
    unused_list = unused(plasmas, spots)
    missing_list = missing(plasmas, spots)
    incorrect_list = incorrect(base, nests, plasmas)
    return HighlightList(incorrect_list, missing_list, unused_list)


def module_wrong(read_view):
    possible_nests = filter(lambda x: read_view.filename.find(read_view.base + '/' + x.base) == 0, read_view.nests)
    return read_view.module_name not in map(lambda x: x.dep(read_view.filename), possible_nests)


def unused(plasmas, spots):
    tokens = map(lambda x: x.token, spots)

    def pred(x):
        return "!" not in x.dep and x.inj not in tokens and x.inj not in map(lambda x: x.inj, SPECIAL_PLASMAS)

    return filter(pred, plasmas)


def missing(plasmas, spots):
    def pred(x):
        dep = plasma.by_spot(plasmas, x)
        return dep == None

    return filter(pred, spots)


def incorrect(base, nests, xs):
    def pred(x):
        candidates = lookup_files.file_by_dep(base, x, nests)
        return len(candidates) == 0 and "!" not in x.dep
    return filter(pred, xs)
