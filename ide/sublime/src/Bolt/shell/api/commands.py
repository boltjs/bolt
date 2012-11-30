import subprocess


def run(command):
    process = subprocess.Popen(
      command, bufsize=-1, stdout=subprocess.PIPE, shell=True
    )
    raw = process.communicate()
    return _parse(raw)


def _parse(raw):
    return filter(lambda x: len(x) > 0, raw[0].split('\n'))
