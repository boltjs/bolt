
New concepts
------------

 - project: A configured bolt project, this would generally be done with a project.json, but can be
            acheived in an ad-hoc manner using command line argments. project.json shall include
            the ability to provide defaults for all command line arguments, including things such
            as build groups, test suites, config directories, cache directories.

 - package: A published project. Described by package.json. Enumerated by version.json. Contains
            relevant data obtained during build process for other project to use as a dependency.

 - version: A semantic version of a package <major>.<minor>.<patch>-<build>. For starters assuming
            compatability for same <major>.<minor>. Simplifying assumption is that a version shall
            always be satisfiable by the highest <patch>-<build> number available.

 - repository: A store of packages. A repository would be a list of packages, each package would
               contain a version.json that lists all versions of the package. Each version of a
               package is described by a package.json. Will have a default format, potentially
               overridable by a function passed into repository details in config file.
