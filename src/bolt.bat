@echo off
setlocal enableextensions

goto entry

:usage
  echo usage: bolt [-h^|--help] [-V^|--version]
  echo     or bolt MODE [^<args^>]
  echo.
  echo modes:
  echo   init
  echo   build
  echo   test
  echo   help
  echo.
  echo For usage/help on a specific mode, use:
  echo   bolt help MODE

  exit /b 0

:fail_usage
  echo.
  call :usage
  exit /b 1

:fail
  exit /b 1

:version
  for /F " delims=" %%i in (%base%version) do set v=%%i
  echo bolt %v%
  exit /b 0


:entry

set base=%~dp0

if "%~1"=="" echo error: must specify mode. && goto fail_usage

set mode=%~1
shift

if "%mode%"=="init" goto done_mode_validation
if "%mode%"=="build" goto done_mode_validation
if "%mode%"=="test" goto done_mode_validation
if "%mode%"=="help" goto done_mode_validation
if "%mode%"=="-h" call :usage && exit /b 0
if "%mode%"=="--help" call :usage && exit /b 0
if "%mode%"=="-V" call :version && exit /b 0
if "%mode%"=="--version" call :version && exit /b 0

echo invalid mode [%mode%], must be one of init^|build^|test^|help
goto fail_usage

:done_mode_validation

if not "%mode%"=="help" goto run_mode

set help_mode=true
set mode=%~1
shift

if "%mode%"=="init" goto run_mode
if "%mode%"=="build" goto run_mode
if "%mode%"=="test" goto run_mode

echo help requires argument: bolt help MODE, where MODE is one of init^|build^|test
exit /b 2

:run_mode

set remaining=
:inline_remaining
if "%~1"=="" goto end_inline_remaining
set remaining=%remaining% "%~1"
shift
goto inline_remaining
:end_inline_remaining

call %base%bolt-%mode%.subr.bat %remaining%
exit /b %errorlevel%
