from lookup import files as lookup_files
from ui.read import x as ui_read
from ui.read import plasma_selection
from api.plasma import open as opener
from core.read import read as core_read


def find_usages_current(view):
    read_view = ui_read.all(view)
    _find_and_open(view, read_view.base, read_view.nests, read_view.module_name)


def find_usages_selection(view):
    read_view = ui_read.all(view)
    plasmas = core_read.plasmas(read_view.ptext)
    plasma = plasma_selection.plasma(view, plasmas)
    if plasma != None:
        _find_and_open(view, read_view.base, read_view.nests, plasma.dep)


def _find_and_open(view, base, nests, name):
    candidates = lookup_files.file_by_search(base, nests, name)
    opener.file_list_open(view, candidates)
