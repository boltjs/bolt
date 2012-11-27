import sbt._
import Keys._

object build extends Build {
  type Sett = Project.Setting[_]

  override lazy val settings = super.settings ++
        Seq(resolvers := Seq(
          "mth.io snapshots"  at "http://repo.mth.io/snapshots"
        , "mth.io releases"  at "http://repo.mth.io/releases"
        , "snapshots" at "http://oss.sonatype.org/content/repositories/snapshots"
        , "releases"  at "http://oss.sonatype.org/content/repositories/releases"
        ))

  val versionInfo = sourceGenerators in Compile <+= (sourceManaged in Compile, version, name) map { (d, v, n) =>
    val file = d / "info.scala"
    IO.write(file, """package com.ephox.bolt.browser
                     |object Info {
                     |  val version = "%s"
                     |  val name = "%s"
                     |}
                     |""".stripMargin.format(v, n))
    Seq(file)
  }


  lazy val copyDependencies = TaskKey[Unit]("copy-dependencies")

  def copydeps = copyDependencies <<= (update, crossTarget, scalaVersion) map {
    (updateReport, out, scalaVer) =>
    updateReport.allFiles foreach { srcPath =>
      val destPath = out / "lib" / srcPath.getName
      IO.copyFile(srcPath, destPath, preserveLastModified=true)
    }
  }

  val browser = Project(
    id = "bolt-browser"
  , base = file(".")
  , settings = Defaults.defaultSettings ++ Seq[Sett](
      name := "bolt-browser"
    , organization := "com.ephox"
    , version := "1.0"
    , scalaVersion := "2.9.2"
    , scalacOptions := Seq(
        "-deprecation"
      , "-unchecked"
      )
    , copydeps
    , sourceDirectory in Compile <<= baseDirectory { _ / "src" }
    , sourceDirectory in Test <<= baseDirectory { _ / "test" }
    , historyPath <<= baseDirectory { b => Some(b / "gen/sbt/.history") }
    , target <<= baseDirectory { _ / "gen/sbt/target" }
    , testOptions in Test += Tests.Setup(() => System.setProperty("specs2.outDir", "gen/sbt/target/specs2-reports"))
    , versionInfo
    , libraryDependencies ++= Seq(
        "io.mth" % "foil_2.9.2" % "1.3-SNAPSHOT" withSources
      , "io.mth" % "pirate_2.9.2" % "0.5-SNAPSHOT" withSources
      , "io.mth" % "route_2.9.2" % "1.3-SNAPSHOT" withSources
      , "com.ephox" % "argonaut_2.9.2" % "5.0-SNAPSHOT" withSources
      , "org.eclipse.jetty" % "jetty-webapp" % "7.1.6.v20100715"
      , "org.seleniumhq.selenium" % "selenium-java" % "2.23.1"
      , "com.opera" % "operadriver" % "0.10"
      , "org.scalaz" % "scalaz-core_2.9.2" % "7.0-SNAPSHOT" withSources
      , "org.specs2" % "specs2_2.9.2" % "1.9" % "test" withSources
      , "org.scalacheck" %% "scalacheck" % "1.9" % "test" withSources
      )
    )
  )
}
