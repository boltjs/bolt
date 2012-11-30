import threading


class GeneralThread(threading.Thread):
    def __init__(self, f, done, on_error):
        self.f = f
        self.done = done
        self.on_error = on_error
        threading.Thread.__init__(self)

    def run(self):
        try:
            result = self.f()
            self.done(result)
        except Exception as exc:
            self.on_error(exc)
