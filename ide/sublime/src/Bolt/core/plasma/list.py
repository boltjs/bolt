from structs.plasma import *


def add(ps, p):
    r = list(ps)
    if contains(ps, p):
        return sort(r)
    else:
        r.append(p)
        return sort(r)


def remove(ps, p):
    return filter(lambda x: not(plasma_eq(x, p)), ps)


def remove_all(ps, xs):
    return filter(lambda x: x not in xs, ps)


def combine(deps, injs):
    plasmas = zip(deps, injs)
    return map(lambda x: Plasma(x[0], x[1]), plasmas)


def sort(plasmas):
    def order(x, y):
        if x.dep in ["bolt.wrap.Underscore", "bolt.wrap._"]:
            return -1
        elif y.dep in ["bolt.wrap.Underscore", "bolt.wrap._"]:
            return 1
        elif x.dep == "bolt.wrap.JQuery":
            return -1
        elif y.dep == "bolt.wrap.JQuery":
            return 1
        else:
            return cmp(x.dep, y.dep)

    return sorted(plasmas, order)


def contains(plasmas, plasma):
    matches = filter(lambda x: plasma_eq(x, plasma), plasmas)
    return len(matches) > 0
