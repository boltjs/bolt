import sublime
import sublime_plugin

from api.plasma import usages


class FindUsagesCurrentCommand(sublime_plugin.TextCommand):
    
    def run(self, edit):
        usages.find_usages_current(self.view)


class FindUsagesSelectionCommand(sublime_plugin.TextCommand):

    def run(self, edit):
        usages.find_usages_selection(self.view)
        
