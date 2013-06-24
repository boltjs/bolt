import unittest

from structs.nest import *
from structs import flat, hier


class TestStructPackage(unittest.TestCase):
    def test(self):
        f = flat.nu('/lib/run')
        self.assertEqual('/lib/run', f.base)
        self.assertEqual('*.Word.js', f.pattern('Word'))
        self.assertEqual('bolt.cat.Cat', f.dep('lib/run/bolt.cat.Cat.js'))
        self.assertEqual('/lib/run/bolt.dog.Dog.js', f.path('bolt.dog.Dog'))

        h = hier.nu('src/main/js')
        self.assertEqual('src/main/js', h.base)
        self.assertEqual('Word.js', h.pattern('Word'))
        self.assertEqual('bolt.dog.Dog', h.dep('src/main/js/bolt/dog/Dog.js'))
        self.assertEqual('src/main/js/bolt/cat/Cat.js', h.path('bolt.cat.Cat'))


if __name__ == '__main__':
    unittest.main()
