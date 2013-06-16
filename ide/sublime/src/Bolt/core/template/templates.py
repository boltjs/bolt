from string import Template


def find_template(template):

    bolt_module_template = """define(
  '$package.$name',

  [

  ],

  function () {
    return null;
  }
);"""

    bolt_test_template = """test(
  '$name',

  [

  ],

  function () {
    assert.eq(1, 2);
  }
);"""

    bolt_ui_template = """define(
  '$package.$name',

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
);"""

    _templates = dict({
      'bolt_module_template': bolt_module_template,
      'bolt_test_template': bolt_test_template,
      'bolt_ui_template': bolt_ui_template
    })
    return Template(_templates[template]) if template in _templates else Template('')
