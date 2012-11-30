import unittest

import lookup.package as lookup_package
import lookup.files as lookup_files
import lookup.project as lookup_project
from structs import flat, hier


class TestPackage(unittest.TestCase):
    def test(self):
        self.assertEqual('ephox.project.blah', lookup_package.from_dir('work/project/src/main/js/ephox/project/blah'))


class TestProject(unittest.TestCase):
    def test(self):
        self.assertEqual('/work/glory', lookup_project.from_file('/work/glory/src/main/js/ephox/cat/Cat.js'))
        self.assertEqual('/work/glory', lookup_project.from_file('/work/glory/lib/main/js/ephox/cat/Cat.js'))


class TestFiles(unittest.TestCase):
    def test(self):
        self.assertEqual([], lookup_files._search_for_inj('/root', 'Cat', []))

        nests = [flat.nu('flat'), flat.nu('flat2'), hier.nu('h')]

        actual = lookup_files._search_for_inj('/root', 'Cat', nests)

        def check_dir(expected, actual):
            self.assertEqual(expected, map(lambda x: x.dir, actual))

        def check_pattern(expected, actual):
            self.assertEqual(expected, map(lambda x: x.pattern, actual))

        def check_extract(expected, actual, value):
            self.assertEqual(expected, map(lambda x: x.extract_dep(value), actual))

        check_dir(['/root/flat', '/root/flat2', '/root/h'], actual)
        check_pattern(['ephox.*.Cat.js', 'ephox.*.Cat.js', 'Cat.js'], actual)
        # FIX: They are sort of nonsense tests as they aren't quite valid execution paths.
        check_extract(['Cat', 'Cat', 'ephox.cat.Cat'], actual, 'src/main/js/ephox/cat/Cat.js')
        check_extract(['ephox.cat.Cat', 'ephox.cat.Cat', 'src.main.js.ephox.cat.Cat.js'], actual, 'src/main/js/ephox.cat.Cat.js')


if __name__ == '__main__':
    unittest.main()
