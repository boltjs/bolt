from structs.spot import *


def word(view):
    w = spot(view)
    return w.token


def spot(view):
    sel = view.word(view.sel()[0])
    token = view.substr(sel).strip()
    # Stripping whitespace here might cause a problem if I try validation.
    return Spot(token, sel.begin(), sel.end())


def line(view):
    sel = view.sel()[0]
    region = view.line(sel)
    return (view.substr(region), sel.begin() - region.begin())


def point(view):
    return view.sel()[0].begin()
