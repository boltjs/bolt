import sublime
import sublime_plugin

from api.inspect import highlighting

class ToggleHighlightCommand(sublime_plugin.TextCommand):
    
    def run(self, edit):
        highlighting.toggle(self.view)

    def is_checked(self):
        return highlighting.is_enabled()

