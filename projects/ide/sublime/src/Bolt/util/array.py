

def unique(xs):
    s = set([])
    r = []

    for x in xs:
        if x not in s:
            s.add(x)
            r.append(x)
    return r
