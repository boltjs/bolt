package com.ephox.bolt.browser
package data

import java.io._

case class Arguments (
  project: File = new File("."),
  root: File = new File("."),
  port: Int = 10099,
  browser: List[Browser] = Nil,
  increment: Boolean = false,
  version: Boolean = false,
  verbose: Boolean = false,
  help: Boolean = false,
  config: String = "",
  tests: List[String] = Nil
)

object Arguments {
  val setproject: (Arguments, String) => Arguments =
    (a, p) => a.copy(project = new File(p))
  val setroot: (Arguments, String) => Arguments =
    (a, t) => a.copy(root = new File(t))
  val setport: (Arguments, String) => Arguments =
    (a, p) => a.copy(port = p.toInt)
  val setfirefox: (Arguments, String) => Arguments =
    (a, path) => a.copy(browser = Browser(Firefox, path) :: a.browser)
  val setchrome: (Arguments, String) => Arguments =
    (a, path) => a.copy(browser = Browser(Chrome, path) :: a.browser)
  val setie: Arguments => Arguments =
    a => a.copy(browser = Browser(InternetExplorer) :: a.browser)
  val setopera: (Arguments, String) => Arguments =
    (a, path) => a.copy(browser = Browser(Opera, path) :: a.browser)
  val setsafari: Arguments => Arguments =
    a => a.copy(browser = Browser(Safari) :: a.browser)
  val setincrement: Arguments => Arguments =
    _.copy(increment = true)
  val setversion: Arguments => Arguments =
    _.copy(version = true)
  val sethelp: Arguments => Arguments =
    _.copy(help = true)
  val setverbose: Arguments => Arguments =
    _.copy(verbose = true)
  val setconfig: (Arguments, String) => Arguments =
    (a, config) => a.copy(config = config)
  val settests: (Arguments, List[String]) => Arguments =
    (a, tests) => a.copy(tests = tests)
  val setpositional: (Arguments, List[String]) => Arguments =
    (a, positional) => positional match {
      case Nil => a
      case x :: xs => settests(setconfig(a, x), xs)
    }
}
