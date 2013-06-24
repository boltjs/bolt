from ui.read import regions
import sublime


def plasmas(view, edit, xs):
    _deps(view, edit, map(lambda x: x.dep, xs))
    _injs(view, edit, map(lambda x: x.inj, xs))


def highlight(view, regions, info):
    view.add_regions(info.name, regions, info.format, info.icon, info.mode)


def remove_highlight(view, x):
    view.erase_regions(x.name)


def remove_highlights(view, xs):
    map(lambda x: view.erase_regions(x.name), xs)


def _format_deps(deps):
    return '\n' + '    ' + ',\n    '.join(map(lambda x: "'" + x + "'", deps)) + '\n  '


def _format_injs(injs):
    return ', '.join(injs)


def _deps(view, edit, xs):
    region = regions.deps(view)
    view.replace(edit, region, _format_deps(xs))


def _injs(view, edit, xs):
    region = regions.injs(view)
    view.replace(edit, region, _format_injs(xs))


def save_settings():
    sublime.save_settings('bolt.sublime-settings')
