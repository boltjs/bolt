package com.ephox.bolt.browser
package driver

import data._

import java.io._

import com.opera.core.systems.OperaDriver
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.{ChromeDriver, ChromeOptions}
import org.openqa.selenium.firefox.{FirefoxDriver, FirefoxBinary, FirefoxProfile}
import org.openqa.selenium.ie.InternetExplorerDriver
import org.openqa.selenium.safari.SafariDriver
import org.openqa.selenium.remote.DesiredCapabilities
import java.util.logging.{Logger, Level, LogManager}

object Driver {
  LogManager.getLogManager().reset();
  Logger.getLogger(Logger.GLOBAL_LOGGER_NAME).setLevel(Level.OFF)

  def byConfig(browser: Browser) =
    try {
      browser.tpe.fold(firefox, chrome, ie, opera, safari)(browser.path)
    } catch {
      case e => { e.printStackTrace; sys.exit(1) }
    }

  def firefox: String => WebDriver =
    execpath => {
      val path = new File(execpath)
      val profile = new FirefoxProfile
      val binary = new FirefoxBinary(path)
      new FirefoxDriver(binary, profile)
    }

  def chrome: String => WebDriver =
    path => {
      val options = new ChromeOptions()
      options.setBinary(new File(path))
      new ChromeDriver(options)
    }

  def ie: String => WebDriver =
    _ => new InternetExplorerDriver

  def opera: String => WebDriver =
    path => {
      val capabilities = DesiredCapabilities.opera()
      capabilities.setCapability("opera.binary", path)
      new OperaDriver(capabilities)
    }

  def safari: String => WebDriver =
    _ => new SafariDriver
}
