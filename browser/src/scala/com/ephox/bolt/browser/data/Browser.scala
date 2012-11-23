package com.ephox.bolt.browser
package data

case class Browser(tpe: BrowserType, path: String = "")

sealed trait BrowserType {
  def fold[X](
    firefox: => X,
    chrome: => X,
    ie: => X,
    opera: => X,
    safari: => X
  ): X = this match {
      case Firefox => firefox
      case Chrome => chrome
      case InternetExplorer => ie
      case Opera => opera
      case Safari => safari
    }
}

object Firefox extends BrowserType
object Chrome extends BrowserType
object InternetExplorer extends BrowserType
object Opera extends BrowserType
object Safari extends BrowserType
