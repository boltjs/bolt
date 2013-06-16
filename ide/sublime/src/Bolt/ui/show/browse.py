

def list(view, xs, f):
    view.window().show_quick_panel(xs, f)


def list_if_needed(view, xs, f):
    if len(xs) == 1:
        f(xs[0])
    elif len(xs) > 1:
        def on_select(index):
            if index > -1:
                f(xs[index])
        list(view, xs, on_select)
