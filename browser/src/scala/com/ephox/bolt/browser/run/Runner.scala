package com.ephox.bolt.browser
package run

import data._
import driver._
import server._

import org.openqa.selenium.WebDriver


object Runner {
  def run(args: Arguments) =
      if (args.browser.isEmpty)
        serve(args)
      else
        test(args)

  def serve(args: Arguments) {
    Server.start(args.root, args.project, args.config, args.tests, args.port, args.increment)
    sys.exit(0)
  }

  def test(args: Arguments) {
    Server.background(args.root, args.project, args.config, args.tests, args.port, args.increment)(port => {
      val passed = args.browser.foldLeft(0)((acc, browser) => {
        val driver = Driver.byConfig(browser)
        val passed = runtest(driver, port, args.verbose)
        if (passed) acc + 1 else acc
      })

      val failed = args.browser.length - passed

      sys.exit(if (failed == 0) 0 else 1)
    })
  }

  def runtest(driver: WebDriver, port: Int, verbose: Boolean) =
    try {
      BrowserTest.test(driver, "http://localhost:" + port, verbose)
    } catch {
      case e => false
    } finally {
      driver.quit()
    }
}
