import sublime
import sublime_plugin

from structs.thread_handler import *
from api.inspect import highlighting
from lookup import file_type as lookup_file_type


class BoltListener(sublime_plugin.EventListener):

    def __init__(self):
        self.thread = None

        def init(t):
            self.thread = t

        def failure(exc):
            self.thread = None

        def success(result):
            self.thread = None

        self.handler = ThreadHandler(init, success, failure)

    def _update_highlight(self, view):
        def run():
            if lookup_file_type.is_bolt_module(view) and highlighting.is_enabled():
                if (self.thread == None):
                    highlighting.run(view, self.handler)
            else:
                highlighting.clear(view)
        return run

    def on_modified(self, view):
        rate = highlighting.get_rate()
        sublime.set_timeout(self._update_highlight(view), rate)

    def on_activated(self, view):
        sublime.set_timeout(self._update_highlight(view), 0)
