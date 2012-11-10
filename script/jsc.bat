@echo off
setlocal enableextensions

goto entry

:fail
  exit /b 1

:entry

set base=%~dp0

for %%i in (node.bat node.exe) do if not "%%~$PATH:i"=="" set node=%%~$PATH:i
if "%node%"=="" echo error: node.js is not on the system path && goto fail

set remaining=
:jsc_remaining
if "%~1"=="" goto end_jsc_remaining
set remaining=%remaining% "%~1"
shift
goto jsc_remaining
:end_jsc_remaining

"%node%" "%base%jsc.js" %remaining%
