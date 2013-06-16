import sublime
from structs import flat, hier


def load_settings():
    return sublime.load_settings('bolt.sublime-settings')


def nests():
    settings = load_settings()
    hierarchy_list = map(hier.nu, settings.get('hierarchy'))
    flat_list = map(flat.nu, settings.get('flat'))
    return hierarchy_list + flat_list
