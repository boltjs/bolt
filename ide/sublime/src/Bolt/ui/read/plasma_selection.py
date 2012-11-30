from ui.query import regions as query_regions
from ui.read import selection
from util import string as strings
from core.query import plasma as query_plasma


def plasma(view, plasmas):
    if query_regions.deps(view):
        sel_line = selection.line(view)
        dep = strings.within(sel_line[0], sel_line[1], "'", "'")
        return query_plasma.by_dep(plasmas, dep) if dep != '' else None
    else:
        inj = selection.word(view)
        return query_plasma.by_inj(plasmas, inj)
