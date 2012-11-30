import re
from ui.read import regions
from structs.spot import *


def excluded_scopes():
    return ['comment', 'string']


def spots(view):

    candidates = view.find_all('[a-zA-Z]+')
    inj = regions.injs(view)

    def spotter(region):
        return Spot(view.substr(region).strip(), region.begin(), region.end())

    def pred(region):
        text = view.substr(region)
        scope = view.scope_name(region.begin())
        ignored_scopes = filter(lambda x: scope.startswith('source.js ' + x), excluded_scopes())
        return len(ignored_scopes) == 0 and region.begin() > inj.end() and re.match('^[A-Z]', text)

    spot_regions = filter(pred, candidates)
    return map(spotter, spot_regions)
