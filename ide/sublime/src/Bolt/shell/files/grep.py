from shell.api import commands


def list(dir, pattern, exclusions):
    command = 'grep -lr "\'' + pattern + '\'" ' + dir + ' --exclude ' + exclusions
    return commands.run(command)
