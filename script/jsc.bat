@echo off
setlocal enableextensions

set base=%~dp0

for %%i in (node.bat node.exe) do if not "%%~$PATH:i"=="" set node=%%~$PATH:i
if "%node%"=="" echo error: node.js is not on the system path && exit /b 1

"%node%" "%base%jsc.js" %*
