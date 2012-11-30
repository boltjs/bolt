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


class TestBoltUiTemplate(unittest.TestCase):
    def test(self):
        actual = templates.find_template('bolt_ui_template')
        replacements = dict({'name': 'Hi', 'package': 'company.project.api'})
        self.assertEqual("""define(
  'company.project.api.Hi',

  [
    'ephox.sugar.api.Element',
    'ephox.sugar.api.Remove'
  ],

  function (Element, Remove) {
    return function () {
      var container = Element.fromTag('div');

      var element = function () {
        return container;
      };

      var destroy = function () {
        Remove.remove(container);
      };

      return {
        element: element,
        destroy: destroy
      };
    };
  }
);""", actual.substitute(replacements))



if __name__ == '__main__':
    unittest.main()
