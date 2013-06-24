def within(text, offset, cs, cf):
    prior_text = text[:offset]
    start = prior_text.rfind(cs) + 1
    stop = text.find(cf, start)
    if (start > -1 and stop > -1):
        return text[start:stop]
    else:
        return ''    

