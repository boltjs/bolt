from ui.read import text, selection, settings
from ui.read import file as read_file
from structs import flat, hier, namespaced

from structs.plasma_text import *
from structs.read_view import *


def plasmas(view):
    deps = text.deps(view)
    injs = text.injs(view)
    return PlasmaText(deps, injs)


def get_base(view):
    default = view.window().folders()[0] if view.window() is not None else ''
    project_settings = settings.project_settings(view)
    return project_settings.get('root', default)


def get_nests(view):
    project_settings = settings.project_settings(view)
    resources = project_settings.get('resources', {})
    hierarchy_list = map(hier.nu, resources.get('hierarchy', []))
    flat_list = map(flat.nu, resources.get('flat', []))
    namespaced_list = map(namespaced.nu, resources.get('namespaced', []))
    return hierarchy_list + flat_list + namespaced_list


def get_external(view):
    project_settings = settings.project_settings(view)
    resources = project_settings.get('resources', {})
    return resources.get('external', [])


def all(view):
    spot = selection.spot(view)
    ptext = plasmas(view)
    filename = read_file.filename(view)
    base = get_base(view)
    module_name = text.module_name(view)
    nests = get_nests(view)
    external = get_external(view)
    return ReadView(base, filename, nests, module_name, spot, ptext, external)
