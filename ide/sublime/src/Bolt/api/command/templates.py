import sublime
import sublime_plugin

from api.template import templater


# Template is not used, but I am keeping it to remind me how you pass through arguments
class InsertBoltModuleTemplateCommand(sublime_plugin.WindowCommand):
    def run(self, paths, template):
        templater.bolt_module(self.window.active_view(), paths[0])


class InsertBoltTestTemplateCommand(sublime_plugin.WindowCommand):
    def run(self, paths, template):
        templater.bolt_test(self.window.active_view(), paths[0])
