from ui.read import regions


def is_bolt_module(view):

    possible_starts = ['define\(', 'test\(']

    js = view.file_name() != None and view.file_name().endswith('.js')
    if js:

        dep_region = regions.deps(view)
        inj_region = regions.injs(view)

        def is_prefix(x):
            pos = view.find(x, 0)
            return pos != None and pos.begin() < dep_region.begin()

        if (dep_region != None and inj_region != None and dep_region.begin() < inj_region.begin()):
            defns = filter(is_prefix, possible_starts)
            if len(defns) == 0:
                return False
            else:
                return True

    return False
