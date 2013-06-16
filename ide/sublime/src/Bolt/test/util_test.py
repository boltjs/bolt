import unittest

from util import array as arrays
from util import string as strings


class TestArray(unittest.TestCase):
    def test(self):
        self.assertEqual([], arrays.unique([]))
        self.assertEqual([1, 2, 3, 4], arrays.unique([1, 2, 3, 4]))
        self.assertEqual([1, 2, 3, 4, 5], arrays.unique([1, 2, 1, 2, 3, 3, 4, 1, 2, 3, 5]))


class TestString(unittest.TestCase):
    def test(self):
        def check(expected, text, cursor, encloser):
            self.assertEqual(
                expected,
                strings.within(text, cursor, encloser, encloser)
            )

        check(
            "ephox.wrap.Underscore",
            " for x in 'ephox.wrap.Underscore' do stuff.",
            20, "'"
        )

        check(
            '',
            ' for x in ephox.wrap.Underscore do stuff',
            20, "'"
        )

        check(
            '',
            ' for x in \' ephox.wrap.Underscore do stuff',
            20, "'"
        )

if __name__ == '__main__':
    unittest.main()

