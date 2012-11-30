import unittest

from structs.nest import *
from structs import flat, hier


# FIX: ephox is hard-coded in for hierarchical
class TestStructPackage(unittest.TestCase):
    def test(self):
        f = flat.nu('/lib/run')
        self.assertEqual('/lib/run', f.base)
        self.assertEqual('ephox.*.Word.js', f.pattern('Word'))
        self.assertEqual('ephox.cat.Cat', f.dep('lib/ephox.cat.Cat.js'))
        self.assertEqual('/lib/run/ephox.dog.Dog.js', f.path('ephox.dog.Dog'))

        h = hier.nu('src/main')
        self.assertEqual('src/main', h.base)
        self.assertEqual('Word.js', h.pattern('Word'))
        self.assertEqual('ephox.dog.Dog', h.dep('src/main/ephox/dog/Dog.js'))
        self.assertEqual('src/main/ephox/cat/Cat.js', h.path('ephox.cat.Cat'))


if __name__ == '__main__':
    unittest.main()
