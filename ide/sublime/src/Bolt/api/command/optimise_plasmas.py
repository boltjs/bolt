import sublime
import sublime_plugin

from api.inspect import optimise

class OptimisePlasmasCommand(sublime_plugin.TextCommand):
    
    def run(self, edit):
        optimise.optimise(self.view, edit)



# Definitely move this.
class NextHighlightCommand(sublime_plugin.TextCommand):    
    def run(self, edit):
        print "Next Highlight Command .... selection moving"  
        sel = self.view.sel()[0]
        
        unused = self.view.get_regions('bolt.unused')    
        missing = self.view.get_regions('bolt.missing')
        incorrect = self.view.get_regions('bolt.incorrect')
        wrong_module = self.view.get_regions('bolt.wrong_module')
        
        all = unused + missing + incorrect + wrong_module
       
        prev_selection = next((r for r in all if r.begin() < sel.begin()), sel)
        next_selection = next((r for r in all if r.begin() > sel.begin()), prev_selection)
        self.view.sel().clear()
        self.view.sel().add(next_selection)
        self.view.show_at_center(next_selection)
