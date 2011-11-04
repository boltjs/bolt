Design for Bolt Module Kernel
=============================

What goes in the kernel
-----------------------
Module definitions
Dependency analysis
Module instantiation

What goes in the module project
-------------------------------
JS Module Loader - fetching stuff from the server
Bootstrap code
Compiler

Kernel API
==========

Instantiate
Configuration
define(id, dependencies, definition)
require(ids, callback)
module = demand(id)  // unsafe because dependency may not exist. Use should be discourage. Used for synchronous APIs.

Define
------
A triple of (id, dependencies, definition) is a blueprint.

Define stores parameters in a data structure called blueprints.

blueprints :: { id: string -> { id: string, dependencies: dependencies, definition: definition} }

Eventually blueprints will be converted into modules.

Modules are stored in a data structure called modules.

modules :: { id: string -> module }


Require
-------
resolve :: id -> loader

// loader turns a url into a blueprint
{ id -> { url: string, serial: boolean, loader: function (callback)

downloader.download({ id -> url }, function ({ id -> textDataFromUrl }) {
    manager.manage(ds);
});


Phases of Require
-----------------

1. Require a set of ids, pass in a callback.
2. 
3. Ids are resolved to a set of files.
