class FinishPipe:
    def __init__(self, f):
        self.f = f

    def next(self, window, values, num, done):
        apply(self.f, values)
