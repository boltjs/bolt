import unittest

from structs.nest import *
from structs import flat, hier, namespaced


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

        n = namespaced.nu('src/js')
        self.assertEqual('src/js', n.base)
        self.assertEqual('Word.js', n.pattern('Word'))
        self.assertEqual('bolt.dog.Dog', n.dep('src/js/bolt.dog/Dog.js'))
        self.assertEqual('src/js/bolt.dog/Dog.js', n.path('bolt.dog.Dog'))
        self.assertEqual('src/js/bolt.dog.bone/Dog.js', n.path('bolt.dog.bone.Dog'))


if __name__ == '__main__':
    unittest.main()
