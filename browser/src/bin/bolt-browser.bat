@echo off
setlocal enableextensions
set BROWSER=%~dp0..
java -cp "%BROWSER%\lib\*;" com.ephox.bolt.browser.cli.Browser -r "%BROWSER%" %*
