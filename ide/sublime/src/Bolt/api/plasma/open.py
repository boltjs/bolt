from ui.show import browse
from ui.show import file as ui_file


def file_list_open(view, candidates):

    def show_file(filename):
        ui_file.file(view, filename)

    browse.list_if_needed(view, candidates, show_file)
