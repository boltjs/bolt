import sublime
import sublime_plugin

from api.plasma import goto


class GotoModuleCommand(sublime_plugin.TextCommand):
    
    def run(self, edit):
        goto.goto_selection(self.view)


