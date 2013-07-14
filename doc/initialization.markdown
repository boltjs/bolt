bolt initialization
===================

Bolt's runtime is composed of 4 primary projects.
 - base
 - kernel
 - loader
 - bolt

Each of those projects expose _only_ a set of bolt
modules. The modules must be in-order so they can be
instantiated without dependency resolution or extra
processing.

These 4 projects are combined with a an internal
define/demand style loader, such that:

```
 +---------------------------------------------+
 |  framework/src/modules.js (internal loader) |
 +---------------------------------------------+
 |                    base                     |
 +---------------------------------------------+
 |      loader         |       kernel          |
 +---------------------------------------------+
 |                    bolt                     |
 +---------------------------------------------+
```

The bolt project then wraps this in a closure and
delegates to `bolt.runtime.entry.Main` module to
actually initialize everything.

`bolt.runtime.entry.Main` determines the platform
and load corresponding `NodeMain` or
`BrowserMain` to actually perform initialization.

The platorm specific mains are then responsible
for setting up a runtime bolt instance that
delays calls to `require`, `define` and `main`
until bolt is configured. The runtime bolt
instance is wrapped to provide a consistent
handle for api methods.

A configure call may happen at anytime in the
future. When a configure happends the deferred
methods are run, and the bolt api is switched
to the live methods.

The configure call may be triggered by the platform
specific main modules or a client call depending on
configuration.

Configure takes a full configuration blob accepting
types, sources and config files. It is expected it
would be normally just be used to delegate to
other configs, but the other items are convenient for
quick set-up and run.

Configure may only be called once. If you want to
re-initialise bolt (i.e. blow it away and start
again, you must call reconfigure). This is a saftey
precaution, as calling configure multiple times
by accident would be very bad (tm). The reconfigure
api would be used anytime you want to have a fresh
bolt. Some use cases for this are:
 - Testing: a fresh bolt for each test case.
 - A tiered or self updating application. Bolt would
   be initialised and load a "kernel". Bolt could
   then be reconfigured to load a clean, independent
   set of models. This would is potentially useful
   for a demo environment or an application if you
   were insane.

The node version of bolt, returns an object containing
the same api as defined on window.bolt in the browser.
To be useful, you would often assign this result to
global.bolt and global.define = bolt.define.

`BrowserMain` depending on data attributes will
perform one or more of the following steps:
 - Register global `define` and `require` unless `date-bolt-globals` is set to `false`.
 - Call main module if `data-bolt-main` is set.
 - Call configure passing in config if `data-bolt-config` is set.

If no config is passed in, it will be up to clients to call configure
explicitly to initialize bolt. Note they can call main/require/define
before or after configure call. Calls will be delayed until
configuration is complete.
