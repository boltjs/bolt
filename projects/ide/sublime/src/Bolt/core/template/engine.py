from string import Template
from core.template import templates


def template_run(filename, template, replacements):
    contents = templates.find_template(template)
    expanded = contents.substitute(replacements)
    output = open(filename, 'w')
    output.write(expanded)
    output.close()


def template_gen(template, replacements):
    t = Template(template)
    return t.substitute(replacements)
