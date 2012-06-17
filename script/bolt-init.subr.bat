@echo off

goto entry

:usage
  echo usage: bolt init  [-c^|--config CONFIG_DIR]
  echo.
  echo options:
  echo   -c^|--config CONFIG_DIR          override bolt configuration directory
  echo                                    default: config/bolt
  echo.
  echo example:
  echo   Initialise a project after checkout.
  echo.
  echo     bolt init

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

:parse_flags
  set flag=%~1
  if not "%flag:~0,1%"=="-" goto done_parse_flags
  shift

  if "%flag%"=="-c" goto parse_config
  if "%flag%"=="--config" goto parse_config
  if "%flag%"=="--" goto done_parse_flags
  echo invalid flag [%flag%] && goto fail_usage

  goto parse_flags

  :parse_config
    if "%~1"=="" echo %flag% requires an argument to be specified && goto fail_usage
    set config_dir=%~1
    shift
  goto parse_flags

:done_parse_flags

if "%config_dir%"=="" set config_dir=config\bolt

call :is_dir "%config_dir%"
if %errorlevel%==1 mkdir "%config_dir%"

rem FIX discuss the merits of cherry picking these two vs generating all.

if exist "%config_dir%\prod.js" call "%base%jsc.bat" dev -c "%config_dir%\prod.js" "%config_dir%\bootstrap-prod.js" || exit /b %errorlevel%
if exist "%config_dir%\demo.js" call "%base%jsc.bat" dev -c "%config_dir%\demo.js" "%config_dir%\bootstrap-demo.js" || exit /b %errorlevel%

exit /b 0
