class ThreadHandler:

    def __init__(self, init, success, failure):
        self.init = init
        self.success = success
        self.failure = failure
    
    def cancel(self):
        self.init(None)

