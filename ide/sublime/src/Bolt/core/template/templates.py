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

    _templates = dict({
      'bolt_module_template': bolt_module_template,
      'bolt_test_template': bolt_test_template
    })
    return Template(_templates[template]) if template in _templates else Template('')
