import unittest

import lookup.temp as lookup_package
import lookup.files as lookup_files
import lookup.project as lookup_project
from structs import flat, hier


class TestTemp(unittest.TestCase):
    src = lookup_package.hierarchy('/project/src')
    lib = lookup_package.flat('/project/lib')

    def test(self):
        def check(expected, nest, input):
            self.assertEqual(expected['base'], nest.base)
            self.assertEqual(expected['dep'], nest.dep(input['filename']))
            self.assertEqual(expected['pattern'], nest.pattern(input['injection']))
            self.assertEqual(expected['path'], nest.path(nest.dep(input['filename'])))
            self.assertEqual(expected['definition'], nest.definition(input['directory'], input['injection']))

        check(dict({
            'base': '/project/src',
            'dep': 'group.alpha.Module',
            'pattern': 'Module.js',
            'path': '/project/src/group/alpha/Module.js',
            'definition': 'group.alpha.Module'
        }), self.src, dict({
            'injection': 'Module',
            'filename': '/project/src/group/alpha/Module.js',
            'directory': '/project/src/group/alpha'
        }))

        check(dict({
            'base': '/project/lib',
            'dep': 'group.alpha.Mango',
            'pattern': '*.Mango.js',
            'path': '/project/lib/group.alpha.Mango.js',
            'definition': 'Mango'
        }), self.lib, dict({
            'injection': 'Mango',
            'filename': '/project/lib/group.alpha.Mango.js',
            'directory': '/project/lib'
        }))

        

if __name__ == '__main__':
    unittest.main()
