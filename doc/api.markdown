Bolt API
========


### Bolt Runtime


```
/*
 * Define a module. Often exposed as <global>.define as well.
 */
  bolt.define(id, dependencies, definition)

/*
 * Require modules and run callback. Often exposed as <global>.require as well.
 */
  bolt.require(dependencies, callback)

/*
 * Demand a module and return it. Use with caution. This operation throws an exception
 * if module has not been loaded. It is most often used to demand pre-loaded modules.
 */
  bolt.demand(id): module

/*
 * Run a main module. A main module is simply a function. Arguments can
 * be specified as an array.
 *
 * A list of config modules and a callback to process those config modules
 * can also be specified. WARNING: this functionality is likely to be
 * removed in the future.
 */
  bolt.main(id, [args], configids, configcallback)

/*
 * Configure bolt. This takes a config blob with optional keys for:
 *  - 'configs: [files]' specifying files (relative to this file) containing config to be loaded.
 *  - 'source: [source]' specifying sources to load code from.
 *  - 'types: [type]' specifying custom types of source that can be used.
 */
  bolt.configure({ configuration })

/*
 * Declare bolt as configured. This takes a config blob with optional keys for:
 *  - 'source: [source]' specifying sources to load code from.
 *  - 'types: [type]' specifying custom types of source that can be used.
 *
 * This operation assumes all configuration files are already loaded. It will
 * only read source and type declarations. configure is the preferred call
 * unless you really need this direct behaviour.
 */
  bolt.configured({ configuration })

/*
 * Re-configure bolt. This takes a config blob with optional keys for:
 *  - 'configs: [files]' specifying files (relative to this file) containing config to be loaded.
 *  - 'source: [source]' specifying sources to load code from.
 *  - 'types: [type]' specifying custom types of source that can be used.
 *
 * This differs from a configure call only in that it can be called multiple times.
 * Calling this clears _ALL_ bolt state.
 */
  bolt.reconfigure({ configuration })

```

### Configuration API

Configuring bolt is done with a single configure call in its own file.


```
/*
 * Configure bolt. This takes a config blob with optional keys for:
 *  - 'configs: [files]' specifying files (relative to this file) containing config to be loaded.
 *  - 'source: [source]' specifying sources to load code from.
 *  - 'types: [type]' specifying custom types of source that can be used.
 */
  configure({ configuration })


/*
 * Create a type of source. The type is a string identifier
 * representing the type of modules to be loaded. The
 * implementation is a namespace that contains a Modulator
 * and a Compiler.
 */
  type(type, implementation)


/*
 * Create a source. The arguments are type specific.
 *
 * To create a bolt source:
 *   source('bolt', <namespace>, <path to root of modules>, <mapper>)
 * e.g.
 *   source('bolt', 'my.project', '../../src/js', mapper.hierarchical)
 *
 * To create a library source:
 *   source('lib', <module name>, <path to js file>, <definition>)
 * e.g.
 *   source('lib', 'jquery', '//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.1/jquery.min', { exports: 'jQuery' }),
 *
 * Note <definition> can be one of:
 *   { define: <custom initialization function returning module definition> }
 *   { exports: <global to use as module definition> }
 *   { exportsAll: [<list of globals to use as attributes on module definition>] }
 *
 */
  source(type, arguments....)




```

### Test API

```
/*
 * Run testsfiles with configfile.
 *
 * Reporter is an object that has the following methods on it:
 *
 *  summary(<number of tests>)
 *  test(testcase, name): { pass(),  fail(error) }
 *  done()
 *
 */
  bolt.test.run(configfile, [testfiles], reporter)


/*
 * Construct a console logging test reporter.
 */
  bolt.test.report.ConsoleReporter(verbose)

```
