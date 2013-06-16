import re
from core.plasma import list as plist


def deps(text):
    values = _parse(text)
    return map(_dequote, values)


def injs(text):
    return _parse(text)


def plasmas(ptext):
    a = deps(ptext.deps)
    b = injs(ptext.injs)
    return plist.combine(a, b)


def _parse(text):
    value = re.sub('\s', '', text)
    return value.split(',') if value != '' else []


def _dequote(s):
    return re.sub("'", "", s)
