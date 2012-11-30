from ui.read import selection, regions


def deps(view):
    cursor = selection.point(view)
    return regions.deps(view).contains(cursor)


def injs(view):
    cursor = selection.point(view)
    return regions.injs(view).contains(cursor)


def after_injs(view):
    cursor = selection.point(view)
    injs = regions.injs(view)
    return cursor > injs.end()
