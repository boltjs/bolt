package com.ephox.bolt.browser
package cli

import data._, Arguments._
import run._


import io.mth.pirate._

import java.io.PrintStream
import java.io.File

import scala.io.Source


object Browser {
  val cmd = command[Arguments]("bolt browser") <|>
    flag1('p', "project", "base directory of project to serve up, CONFIG and TEST must be relative to base, default $CWD.", "DIR")(setproject) <|>
    flag1('r', "root", "bolt browser install directory, defaults based upon bolt-browser executable.", "DIR")(setroot) <|>
    long1("port", "start server on port, default 10099.", "PORT")(setport) <|>
    flag1('f', "firefox", "use firefox, with specified executable.", "PATH")(setfirefox) <|>
    flag1('c', "chrome", "use chrome, with specified executable.", "PATH")(setchrome) <|>
    flag('e', "ie", "use internet explorer.")(setie) <|>
    flag1('o', "opera", "use opera, with specified executable.", "PATH")(setopera) <|>
    flag('s', "safari", "use safari.")(setsafari) <|>
    flag('i', "increment", "auto-increment the port number, if the specified port number is in use, until a free port number is found.")(setincrement) <|>
    flag('V', "version", "display version.")(setversion) <|>
    flag('h', "help", "display usage.")(sethelp) <|>
    flag('v', "verbose", "verbose output.")(setverbose) >|
    positional0plus("CONFIG TEST...")(setpositional)

  val program =
    cmd ~ """
      | bolt browser is a test runner that allows for test execution in the
      | browser. There are two modes of operation, one where tests
      | are automatically run in the browser and ouput to the command
      | line in a manner similar to `bolt test`. The other mode only
      | starts the server so the tests can be run from within any browser.
      |
      | Server mode is selected by not specifying any browsers.
      |
      | Test mode is selected by specifying one or more browsers.
      |
      | Note that [ CONFIG  TEST... ] is mandatory unless specifying -V|-h
    """.stripMargin

  def exitwith(s: String, code: Int, out: PrintStream = Console.out) {
    out.println(s)
    sys.exit(code)
  }

  def main(args: Array[String]) {
    program.dispatchOrDie(args.toList, Arguments()) { args =>
      if (args.version)
        exitwith(Info.name + " " + Info.version, 0)

      if (args.help)
        exitwith(cmd.usage, 0)

      if (args.config == "" || args.tests.isEmpty)
        exitwith(cmd.usage, 1)

      Runner.run(args)
    }
  }
}
