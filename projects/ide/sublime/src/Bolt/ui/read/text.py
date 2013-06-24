from ui.read import regions


def module_name(view):
    region = regions.module_name(view)
    return _region(view, region)


def deps(view):
    region = regions.deps(view)
    return _region(view, region)


def injs(view):
    region = regions.injs(view)
    return _region(view, region)


def _region(view, region):
    return view.substr(region) if region != None else ''
