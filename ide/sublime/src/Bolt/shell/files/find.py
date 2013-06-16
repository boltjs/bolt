from shell.api import commands


def list(dir, pattern):
    command = 'find "' + dir + '" -name "' + pattern + '"'
    return commands.run(command)
