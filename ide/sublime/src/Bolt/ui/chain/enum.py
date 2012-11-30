class EnumPipe:
    def __init__(self, options):
        self.options = options

    def next(self, window, values, num, done):
        def on_done(index):
            if (index > -1):
                values.append(self.options[index])
                done(num + 1, values)

        window.show_quick_panel(self.options, on_done)
