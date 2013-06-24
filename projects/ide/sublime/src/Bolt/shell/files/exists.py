from shell.api import commands


def exists(files):
    return len(check(files) > 0)


def check(files):
    s = " ".join(files)
    command = 'for x in ' + s + '; do if [ -f $x ]; then echo $x; fi done'
    return commands.run(command)
