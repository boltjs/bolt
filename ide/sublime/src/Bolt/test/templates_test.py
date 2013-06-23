import unittest

from core.template import templates


class TestBoltModuleTemplate(unittest.TestCase):
    def test(self):
        actual = templates.find_template('bolt_module_template')
        replacements = dict({'name': 'Hi', 'package': 'Yo'})
        self.assertEqual("""define(
  'Yo.Hi',

  [

  ],

  function () {
    return null;
  }
);""", actual.substitute(replacements))


class TestBoltTestTemplate(unittest.TestCase):
    def test(self):
        actual = templates.find_template('bolt_test_template')
        replacements = dict({'name': 'Hi'})
        self.assertEqual("""test(
  'Hi',

  [

  ],

  function () {
    assert.eq(1, 2);
  }
);""", actual.substitute(replacements))


if __name__ == '__main__':
    unittest.main()
