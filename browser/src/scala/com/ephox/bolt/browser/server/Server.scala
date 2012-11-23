package com.ephox.bolt.browser
package server

import io.mth.foil._
import java.lang.Thread
import java.io._
import java.net.BindException
import org.eclipse.jetty.util.log.Logger
import org.eclipse.jetty.util.log.Log
import org.eclipse.jetty.server.{Server => JServer}

object Server {
  def background(root: File, project: File, config: String, tests: List[String], port: Int, increment: Boolean)(f: Int => Unit) = 
    withServer(root, project, config, tests, port, increment)({ case (p, _) => f(p) })

  def start(root: File, project: File, config: String, tests: List[String], port: Int, increment: Boolean) = 
    withServer(root, project, config, tests, port, increment)({ case (_, t) => t.join })

  def withServer(root: File, project: File, config: String, tests: List[String], port: Int, increment: Boolean)(f: (Int, JServer) => Unit): Unit = {
    Log.setLog(NullLogger)
    val cfg = compound(List(
      servlet("/harness", "/*", new HarnessServlet(config, tests)),
      path("/project", project.getAbsolutePath, false),
      path("/", new File(root, "www").getAbsolutePath, false)
    ))
    val (p, t) = run(port, cfg, increment)
    f(p, t)
  }

  def run(port: Int, cfg: JettyConfig, increment: Boolean): (Int, JServer) = {
    def loop(p: Int): (Int, JServer) =
      try {
        println("server starting on http://localhost:" + p + "/, C-c to exit.")
        val jetty = Jetty.server(p, cfg)
        jetty.start
        (p, jetty)
      } catch {
        case e:BindException if increment && e.getMessage() == "Address already in use" => {
          println("address already in use, trying port " + (p + 1) + "...")
          loop(p + 1)
        }
        case e => { e.printStackTrace; sys.exit(1) }
      }
    loop(port)
  }

  object NullLogger extends Logger {
    def isDebugEnabled = false
    def setDebugEnabled(enabled: Boolean) {}
    def info(msg: String) {}
    def info(msg: String, a: Object*) {}
    def info(msg: String, t: Throwable) {}
    def info(t: Throwable) {}
    def debug(msg: String) {}
    def debug(t: Throwable) {}
    def debug(msg: String, t: Throwable) {}
    def debug(msg: String, a: Object*) {}
    def warn(msg: String) {}
    def warn(t: Throwable) {}
    def warn(msg: String, a: Object*) {}
    def warn(msg: String, t: Throwable) {}
    def getLogger(name: String) = NullLogger
    def getName = "NullLogger";
  }
}
