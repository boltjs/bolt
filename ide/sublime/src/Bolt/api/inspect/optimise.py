from ui.read import x as ui_read
from ui.read import spots as read_spots
from core.read import read as core_read
from core.analyse import analyse
from core.plasma import list as plist
from ui.write import write as ui_write


def optimise(view, edit):
    read_view = ui_read.all(view)
    spots = read_spots.spots(view)
    plasmas = core_read.plasmas(read_view.ptext)

    unused = analyse.unused(plasmas, spots)
    optimised = plist.remove_all(plasmas, unused)
    ui_write.plasmas(view, edit, plist.sort(optimised))
