import sublime
from ui.read import regions as read_regions
from structs.highlight_list import *
# Hmmm....


def highlight(view, regions, info):
    if regions != None:
        view.add_regions(info.name, regions, info.format, info.icon, info.mode)
    else:
        remove_highlight(view, info)


def remove_highlight(view, x):
    view.erase_regions(x.name)


def remove_highlights(view, xs):
    map(lambda x: view.erase_regions(x.name), xs)


def regions(view, highlights):
    missing_list = filter(lambda x: is_valid_spot(view, x), highlights.missing)
    missing_regions = map(lambda x: sublime.Region(x.begin, x.end), missing_list)
    incorrect_regions = dep_region(view, highlights.incorrect)
    unused_regions = dep_region(view, highlights.unused)
    return HighlightList(incorrect_regions, missing_regions, unused_regions)


def dep_region(view, plasmas):
    return map(lambda x: read_regions.dep(view, x.dep), plasmas)


def is_valid_spot(view, spot):
    return spot.begin < spot.end and view.substr(sublime.Region(spot.begin, spot.end)) == spot.token
