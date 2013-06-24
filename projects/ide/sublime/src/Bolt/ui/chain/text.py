class TextPipe:
    def __init__(self, label, initial):
        self.label = label
        self.initial = initial

    def next(self, window, values, num, done):
        def on_done(value):
            if (value != None):
                values.append(value)
                done(num + 1, values)

        last_value = values[len(values) - 1] if len(values) > 0 else None
        window.show_input_panel(self.label, self.initial(values, last_value),
            on_done, None, None)
