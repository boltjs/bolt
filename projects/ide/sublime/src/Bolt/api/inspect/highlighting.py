import sublime
from ui.read import settings as read_settings
from ui.write import write, highlight as write_highlight
from lookup import file_type as lookup_file_type
from ui.read import x as ui_read
from ui.read import spots as read_spots
from ui.read import regions as ui_regions
from core.read import read as core_read
from structs.general_thread import *
from structs.thread_handler import *
from structs.highlight_list import *
from structs.flag_region import *
from core.analyse import analyse


def flags():
    return [
        FlagRegion('bolt.incorrect', 'comment', 'light_x', 0),
        FlagRegion('bolt.missing', 'string', 'arrow_right', 0),
        FlagRegion('bolt.unused', 'comment', 'dot', sublime.DRAW_OUTLINED),
        FlagRegion('bolt.wrong_module', 'comment', 'light_x', 0)
    ]


def highlight_setting():
    return 'bolt.live.highlight'


def rate_setting():
    return 'bolt.live.highlight.rate'


def is_enabled():
    settings = read_settings.load_settings()
    return settings.get(highlight_setting(), False)


def get_rate():
    settings = read_settings.load_settings()
    return settings.get(rate_setting(), 1000)


def set_enabled(state):
    settings = read_settings.load_settings()
    settings.set(highlight_setting(), state)
    write.save_settings()


def toggle(view):

    def noop(v):
        return True

    handler = ThreadHandler(noop, noop, noop)

    prev = is_enabled()
    current = not prev
    if (current):
        run(view, handler)
    else:
        clear(view)

    set_enabled(current)


def run(view, handler):

    valid = lookup_file_type.is_bolt_module(view)
    if not valid:
        open_file = view.file_name() if view.file_name() != None else '-- no view'
        print 'View is not a bolt module: ' + open_file
        handler.cancel()
    else:
        read_view = ui_read.all(view)
        spots = read_spots.spots(view)
        plasmas = core_read.plasmas(read_view.ptext)

        def update_ui(highlights, module_wrong):
            def run():
                regions = write_highlight.regions(view, highlights)
                module_region = [ui_regions.module_name(view)] if module_wrong else []
                flag_info = zip(flags(), [regions.incorrect, regions.missing, regions.unused, module_region])

                def highlight_flag(x):
                    if len(x[1]) > 0:
                        write_highlight.highlight(view, x[1], x[0]),
                    else:
                        write_highlight.remove_highlight(view, x[0])

                map(highlight_flag, flag_info)
            sublime.set_timeout(run, 0)

        thread = GeneralThread(_highlighter(read_view, spots, plasmas, update_ui), handler.success, handler.failure)
        sublime.set_timeout(thread.start, 0)
        handler.init(thread)


def clear(view):
    def run():
        write_highlight.remove_highlights(view, flags())
    sublime.set_timeout(run, 0)


def _highlighter(read_view, spots, plasmas, callback):
    def r():
        try:
            highlights = analyse.all(read_view.base, read_view.nests, plasmas, spots)
            module_wrong = analyse.module_wrong(read_view)
            callback(highlights, module_wrong)

        except Exception as exc:
            print "Error during identifying highlighted regions: " + str(exc)
            traceback.print_exc(limit=10)
            callback(HighlightLists([], [], []), False)
    return r
