from ui.read import text, selection, settings
from ui.read import file as read_file
from lookup import project as lookup_project

from structs.plasma_text import *
from structs.read_view import *


def plasmas(view):
    deps = text.deps(view)
    injs = text.injs(view)
    return PlasmaText(deps, injs)


def all(view):
    spot = selection.spot(view)
    ptext = plasmas(view)
    filename = read_file.filename(view)
    base = lookup_project.from_file(filename)
    module_name = text.module_name(view)
    nests = settings.nests()
    return ReadView(base, filename, nests, module_name, spot, ptext)
