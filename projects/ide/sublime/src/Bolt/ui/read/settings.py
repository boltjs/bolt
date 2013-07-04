import sublime


def load_settings():
    return sublime.load_settings('bolt.sublime-settings')


def get_from_lightning_settings():
    settings = load_settings()
    resources = {'flat': settings.get('flat', []), 'hierarchy': settings.get('hierarchy', []), 'namespaced': []}
    return {'resources': resources}


def project_settings(view):
    return view.settings().get('bolt.project', get_from_lightning_settings())
