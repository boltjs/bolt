def by_spot(xs, spot):
    return by_inj(xs, spot.token)


def by_inj(xs, inj):
    return _by_pred(xs, lambda x: x.inj == inj)


def by_dep(xs, dep):
    return _by_pred(xs, lambda x: x.dep == dep)


def _by_pred(xs, pred):
    filtered = filter(pred, xs)
    return filtered[0] if len(filtered) > 0 else None
