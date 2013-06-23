from ui.read import x as ui_read, plasma_selection, selection
from ui.write import write
from core.read import read as core_read
from core.query import plasma as query_plasma
from core.plasma import list as plist
from ui.show import browse
from lookup import files as lookup_files

from structs.plasma import *


def import_selection(view, edit):
    read_view = ui_read.all(view)
    _import_plasmas(view, read_view, read_view.spot.token, _plasma_writer(view, edit))


def import_token(view, edit, token):
    read_view = ui_read.all(view)
    _import_plasmas(view, read_view, token, _plasma_writer(view, edit))


def delete_selection(view, edit):
    read_view = ui_read.all(view)
    plasmas = core_read.plasmas(read_view.ptext)
    plasma = plasma_selection.plasma(view, plasmas)
    if plasma != None:
        r = plist.remove(plasmas, plasma)
        _plasma_writer(view, edit)(r)


def _plasma_writer(view, edit):
    # should sorting happen here?
    def r(plasmas):
        write.plasmas(view, edit, plist.sort(plasmas))
    return r


def _import_plasmas(view, read_view, token, done):
    init_plasmas = core_read.plasmas(read_view.ptext)
    existing = query_plasma.by_inj(init_plasmas, token)
    if (existing is None):
        def importer(dep):
            chosen = Plasma(dep, token)
            plasmas = plist.add(init_plasmas, chosen)
            done(plasmas)

        candidates = _find_candidates(read_view.base, token, read_view.nests)
        browse.list_if_needed(view, candidates, importer)


UNDERSCORE = Plasma('bolt.wrap.Underscore', '_')
JQUERY = Plasma('bolt.wrap.JQuery', '$')

SPECIAL_PLASMAS = [UNDERSCORE, JQUERY]


def _find_candidates(base, token, nests):
    specials = filter(lambda x: x.inj == token, SPECIAL_PLASMAS)
    if len(specials) > 0:
        return map(lambda x: x.dep, specials)
    else:
        return lookup_files.search(base, token, nests)
