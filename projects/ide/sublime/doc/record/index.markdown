Nest
=====



Spot
====

A Spot stores its location and the text value it represents. Spots are used for highlighting missing imports. The location acts as a safeguard to ensure that when the highlighting process has finished, if the location defined by the Spot no longer contains the right text, it can be ignored. Specifically, a Spot has three properties:

    Spot(token: String, begin: Int, end: Int)

* **token** the text value this Spot represents
* **begin**: the location of its start
* **end**: the location of its end


PlasmaText
===========

The PlasmaText is just a basic structure for maintaining two pieces of text. Its purpose is to allow processing of the text in a background thread.

    PlasmaText(deps: String, injs: String)

* **deps** the text contained within the dependency section
* **injs** the text contained within the injection section



ReadView
=========

When `live highlighting` was added to the `bolt plugin`, clear distinctions had to be made between events which interacted with the user interface, and those that didn't. The background processing of highlighting needs to be on a thread, but plugins are not permitted to read or write to the UI in a thread. Therefore, a readview is a cache of the pertinent user interface information for use in background processes. Make that clearer.

    ReadView(base: String, filename: String, nests: [Nest], module_name: String, 
      spots: [Spot], ptext: PlasmaText) 

* **base** this is the location which serves as the root of the project tree.
* **filename** this is the name of the current file being viewed.
* **nests** this is a list of possible locations and pathing routines for outlining potential positions of other modules.
* **module_name** this is the namespace of the current module (e.g. project.xxy.Main).
* **spot** this is a list of markers referring to possible module names in the current module. It is used for analysing and flagging imports.
* **ptext** the pair of text representing the dependency section and the injection section.

In summary, the ReadView must encompass any information that is required by a background thread and is part of the user interface.



chain
=====

The `ui.chain` modules are used to sequence several user interface actions together. At each stage, the information presented to the user might be dependent upon the previous stage. A chain consists of a sequence of pipes presented by a view window. The supported pipe types are:


* **EnumPipe**: this allows a user to choose between a set of options

* **TextPipe**: this allows a user to type in their desired value

* **FinishPipe**: there should be **one and only one** FinishPipe in a chain. It must be at the end.


As the user progresses through the chain, their input is recorded in an array of values. These values can be processed by each pipe, allowing it to present particular information based on previous user responses. The constructors for the Pipes are shown below.

EnumPipe
--------

    EnumPipe(options: [String])

* **options**: is a list of strings representing the set of values from which to choose. An EnumPipe does not consider any previous responses in the chain.

Example:

    fruit = EnumPipe(['orange', 'apple', 'pear'])


TextPipe
--------

    TextPipe(label: String, initial: ([String], String) -> String)

* **label**: is the text label for the user input
* **initial**: is a function which takes in two arguments and returns the value to use for the `initial` text. Its arguments are:
  * the list of values received so far
  * the last value in the above list

Example:

    fruit = TextPipe('Fruit', lambda x, y: y + ' again?')


FinishPipe
----------

    FinishPipe(done: (String, String, ...) -> IO ())

 * **done**: is the function to invoke at the end of the chain. The number of arguments **must** equal the number of previous pipes in the chain. The function can do anything.


Chaining
---------

A chain is triggered by supplying a window (for the UI components) and the list of pipes. Example:

    def done(language, rationale):
        print('You like ' + language + ' because of ' + rationale + '. Interesting.')

    chain.go(view.window(), [
        EnumPipe(['python', 'scheme']),
        TextPipe('Rationale: ', lambda x, y: 'Why do you like ' + y + '?'),
        FinishPipe(lambda x, y: done)
    ])
