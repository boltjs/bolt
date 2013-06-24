

def go(window, pipeline):

    def next_pipe(num, values):
        pipeline[num].next(window, values, num, next_pipe)

    pipeline[0].next(window, [], 0, next_pipe)
