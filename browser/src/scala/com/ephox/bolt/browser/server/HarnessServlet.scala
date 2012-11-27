package com.ephox.bolt.browser
package server

import com.ephox.argonaut._, Argonaut._
import javax.servlet.http.{HttpServletResponse, HttpServletRequest, HttpServlet}
import scala.io.Source

class HarnessServlet(config: String, includes: List[String]) extends HttpServlet {
  val json =
    ("config", config.jencode) ->:
    ("scripts", includes.jencode) ->:
    jEmptyObject

  val string =
    json.spaces2

  override def service(req: HttpServletRequest, resp: HttpServletResponse) {
    val writer = resp.getWriter
    resp.setContentType("application/json")
    resp.addHeader("Cache-Control", "no-cache")
    writer.print(string)
  }
}
