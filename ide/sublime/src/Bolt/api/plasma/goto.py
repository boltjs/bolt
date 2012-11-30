from lookup import files as lookup_files
from ui.read import x as ui_read
from core.read import read as core_read
from ui.read import plasma_selection
from api.plasma import open as opener


def goto_selection(view):
    read_view = ui_read.all(view)
    plasmas = core_read.plasmas(read_view.ptext)
    plasma = plasma_selection.plasma(view, plasmas)
    if plasma != None:
        _goto_module(view, plasma)


def _goto_module(view, plasma):
    read_view = ui_read.all(view)
    candidates = lookup_files.file_by_dep(read_view.base, plasma, read_view.nests)
    opener.file_list_open(view, candidates)
