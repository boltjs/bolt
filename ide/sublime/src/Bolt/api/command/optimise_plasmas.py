import sublime
import sublime_plugin

from api.inspect import optimise

class OptimisePlasmasCommand(sublime_plugin.TextCommand):
    
    def run(self, edit):
        optimise.optimise(self.view, edit)

