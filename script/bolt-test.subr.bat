@echo off

goto entry

:usage
  echo usage: bolt test [-v^|--verbose] CONFIG TEST ...
  echo.
  echo arguments:
  echo   CONFIG                   The bolt configuration file to be used for tests
  echo   TEST                     A test file. The test file may contain one or more
  echo                            test methods. Test files have an `assert` library
  echo                            exposed to them automatically.
  echo.
  echo example:
  echo   Run all atomic tests.
  echo.
  echo     bolt test config/bolt/atomic.js src/test/js/atomic/**/*.js
  echo.
  echo.
  echo   Run all browser tests.
  echo.
  echo     bolt test config/bolt/browser.js src/test/js/browser/**/*.js

  exit /b 0

:fail_usage
  echo.
  call :usage
  exit /b 1

:fail
  exit /b 1

:is_dir
  setlocal
  set olddir=%CD%
  cd /D "%~1" 2>NUL
  set err=%errorlevel%
  cd /D "%olddir%"
  exit /b %err%


:entry

if "%help_mode%"=="true" call :usage && exit /b 0

set verbose=false

if "%~1"=="-v" (set verbose=true
  shift && goto done_flags)
if "%~1"=="--verbose" (set verbose=true
  shift && goto done_flags)

if "%~1"=="" goto done_flags

set flag=%~1
if "%flag:~0,1%"=="-" echo Unknown flag [%flag%] && goto fail_usage

:done_flags

if "%~2"=="" echo Not enough arguments, must specify configuration and at least one test file. && goto fail_usage

set config=%~1
shift

if not exist "%config%" echo Could not find config file [%config%] && exit /b 10
call :is_dir "%config%"
if %errorlevel%==0 echo Could not find config file [%config%] && exit /b 10

for %%i in (node.bat node.exe) do if not "%%~$PATH:i"=="" set node=%%~$PATH:i
if "%node%"=="" echo error: node.js is not on the system path && goto fail

set remaining=
:remaining
if "%~1"=="" goto end_remaining
for /F "usebackq delims=" %%s in (`glob -w "%~1"`) do set globbed=%%s
set remaining=%remaining% %globbed%
shift
goto remaining
:end_remaining

for %%i in (%remaining%) do (
  if not exist %%i echo Could not find test file [%%i] && exit /b 20
  call :is_dir %%i
  if !errorlevel!==0 echo Could not find test file [%%i] && exit /b 20)

"%node%" "%base%bolt-test.js" "%verbose%" "%config%" %remaining%
