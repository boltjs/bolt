package com.ephox.bolt.browser
package driver

import org.openqa.selenium.By.className
import org.openqa.selenium.{SearchContext, WebDriver}
import scala.collection.JavaConversions._
import org.openqa.selenium.support.ui.{ExpectedCondition, WebDriverWait}

object BrowserTest {
  def test(driver: WebDriver, url: String, verbose: Boolean) = {
    driver.get(url)
    new WebDriverWait(driver, 10).until(isDone)
    val result = findByClass(driver, "test").map(el =>
      (!isEmpty(el, "passed"), text(el, "testfile"), text(el, "name"), text(el, "time"), text(el, "error"))
    )

    result.foreach({
      case (r, testfile, name, time, error) => {
        if (verbose)
          printf("[%s]%n", name)
        if (verbose && r)
          printf("+ [passed] in %s%n", time)
        if (!r)
          printf("- [failed] : %s#%s%n%s%n", testfile, name, error)
      }
    })

    val tests = result.length
    val passed = result.foldLeft(0)({
      case (acc, (r, _, _, _, _)) => if (r) acc + 1 else acc
    })
    val failed = tests - passed
    val totaltime = texttwo(driver, "done", "time")

    printf("Ran %s tests in %s, %s passed, %s failed.%n", tests, totaltime, passed, failed)

    result.forall({ case (r, _, _, _, _) => r })
  }

  def findByClass(ctx: SearchContext, name: String) =
    ctx.findElements(className(name)).toList

  def getByClass(ctx: SearchContext, name: String) =
    findByClass(ctx, name).headOption

  def isEmpty(ctx: SearchContext, name: String) =
    findByClass(ctx, name).size == 0

  def text(ctx: SearchContext, name: String, default: String = "") =
    getByClass(ctx, name).map(_.getText).getOrElse(default)

  def texttwo(ctx: SearchContext, o: String, t: String, default: String = "") =
    (for {
      one <- getByClass(ctx, o)
      two <- getByClass(ctx, t)
    } yield two.getText).getOrElse(default)

  def isDone = new ExpectedCondition[Boolean] {
    def apply(d: WebDriver) = !isEmpty(d, "done")
  }
}
