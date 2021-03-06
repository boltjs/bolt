from lookup import node as lookup_node
from ui.chain import chain
from ui.chain.enum import *
from ui.chain.finish import *
from ui.chain.text import *
from ui.show import file as show_file
from ui.read import x as ui_read
from core.template import engine
import os.path


def bolt_module(view, location):
    gen_module_template(view, location, 'bolt_module_template')


def bolt_test(view, location):
    read_view = ui_read.all(view)
    nests = map(lambda n: read_view.base + '/' + n.base, read_view.nests)
    node = lookup_node.from_path(nests, location)

    def on_finish(name):
        gen_template(view, node, name, 'bolt_test_template', dict({
            'name': name
        }))

    pipeline = [
        TextPipe('Name ', lambda x, y: ''),
        FinishPipe(on_finish)
    ]
    chain.go(view.window(), pipeline)


def gen_module_template(view, location, template):
    read_view = ui_read.all(view)
    nests = map(lambda n: read_view.base + '/' + n.base, read_view.nests)
    node = lookup_node.from_path(nests, location)

    def on_finish(name):
        gen_template(view, node, name, template, dict({
            'name': name,
            'package': node.package
        }))

    pipeline = [
        TextPipe('Name ', lambda x, y: ''),
        FinishPipe(on_finish)
    ]
    chain.go(view.window(), pipeline)


def gen_template(view, node, name, template, replacements):
    filename = os.path.join(node.dir, name + '.js')
    engine.template_run(filename, template, replacements)
    show_file.file(view, filename)
