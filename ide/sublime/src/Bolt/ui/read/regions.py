import sublime


def module_name(view):
    return _extract(view, "define\(\s+'", "'")


def deps(view):
    return _extract(view, '\[', '\]')


def injs(view):
    return _extract(view, 'function\s*\(', '\)')


def dep(view, dependency):
    begin = view.find('\[', 0).end()
    return view.find('\'' + dependency + '\'', begin)


def _extract(view, begin, end):
    start = view.find(begin, 0)
    if start != None:
        finish = view.find(end, start.end())
        if finish != None:
            return sublime.Region(start.end(), finish.end() - 1)

    return None
