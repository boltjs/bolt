@echo off
setlocal enableextensions

goto entry

:usage
  echo usage: jsc dev      [-c^|--config CONFIG_JS] [BOOTSTRAP_TARGET]
  echo     or jsc compile  [-c^|--config CONFIG_JS] MODULE_FILE ... COMPILE_TARGET
  echo     or jsc identify MODULE_FILE
  echo     or jsc inline   [-c^|--config CONFIG_JS] [-n^|--invoke-main MAIN_MODULE] [-r^|--register] COMPILE_FILE ... LINK_TARGET
  echo     or jsc link     [-c^|--config CONFIG_JS] COMPILE_FILE ... LINK_TARGET
  echo     or jsc help
  echo.
  echo arguments:
  echo   BOOTSTRAP_TARGET file to generate for running in dev mode, this defaults
  echo                    to a file called bootstrap.js in the same directory as
  echo                    the config file
  echo   MODULE_FILE      file containing an uncompiled module
  echo   COMPILE_TARGET   file to generate when compiling, will contain the set of
  echo                    modules and their dependencies
  echo   COMPILE_FILE     file produced by compilation to use as input to linking,
  echo                    COMPILE_FILE must have corresponding 'COMPILE_TARGET.meta'
  echo   LINK_TARGET      file to generate when linking, will contain bootstrap
  echo                    information: bolt, install and configuration
  echo.
  echo options:
  echo   -c^|--config CONFIG_JS          override bolt configuration file
  echo                                    default: config/bolt/prod.js
  echo   -o^|--output OUTPUT_DIR         override compilation output directory
  echo                                    default: scratch/main/js/compile
  echo   -n^|--invoke-main MAIN_MODULE   specify main module of inline scripts
  echo   -r^|--register                  register modules in global namespace
  echo.

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
  cd "%~1" 2>NUL
  set err=%errorlevel%
  cd "%olddir%"
  exit /b %err%


:entry

set base=%~dp0

if "%~1"=="" echo error: must specify mode. && goto fail_usage

set mode=%~1
shift

if "%mode%"=="dev" goto done_mode_validation
if "%mode%"=="compile" goto done_mode_validation
if "%mode%"=="identify" goto done_mode_validation
if "%mode%"=="inline" goto done_mode_validation
if "%mode%"=="link" goto done_mode_validation
if "%mode%"=="help" call :usage && exit /b 0

echo invalid mode [%mode%], must be one of dev^|compile^|identify^|inline^|link^|help
goto fail_usage

:done_mode_validation

:parse_flags
  set flag=%~1
  if not "%flag:~0,1%"=="-" goto done_parse_flags
  shift

  if "%flag%"=="-c" goto parse_config
  if "%flag%"=="--config" goto parse_config
  if "%flag%"=="-o" goto parse_output
  if "%flag%"=="--output" goto parse_output
  if "%flag%"=="-n" goto parse_invoke
  if "%flag%"=="--invoke-main" goto parse_invoke
  if "%flag%"=="-r" goto parse_register
  if "%flag%"=="--register" goto parse_register
  if "%flag%"=="--" goto done_parse_flags
  echo invalid flag [%flag%] && goto fail_usage

  goto parse_flags

  :parse_config
    if "%~1"=="" echo %flag% requires an argument to be specified && goto fail_usage
    set config_js=%~1
    shift
  goto parse_flags

  :parse_output
    if "%~1"=="" echo %flag% requires an argument to be specified && goto fail_usage
    set output_dir=%~1
    shift
  goto parse_flags

  :parse_invoke
    if "%~1"=="" echo %flag% requires an argument to be specified && goto fail_usage
    set invoke_main=true
    set main=%~1
    shift
  goto parse_flags

  :parse_register
    set register_modules=true
  goto parse_flags

:done_parse_flags

if "%config_js%"=="" set config_js=config/bolt/prod.js
if "%output_dir%"=="" set output_dir=scratch/main/js/compile
if "%register_modules%"=="" set register_modules=false
if "%invoke_main%"=="" set invoke_main=false

if not exist "%config_js%" echo %config_js% does not exist or is not a file && goto fail
call :is_dir "%config_js%"
if %errorlevel%==0 echo %config_js% does not exist or is not a file && goto fail

for %%i in (node.exe) do set node=%%~$PATH:i
if "%node%"=="" echo error: node.js is not on the system path && goto fail

if "%mode%"=="dev" goto jsc_dev
if "%mode%"=="compile" goto jsc_compile
if "%mode%"=="identify" goto jsc_identify
if "%mode%"=="inline" goto jsc_inline
if "%mode%"=="link" goto jsc_link
exit /b 0

:jsc_dev
  if "%~1"=="" for %%F in ("%config_js%") do (set bootstrap=%%~dpFbootstrap.js) && goto exec_jsc_dev
  if "%~2"=="" (set bootstrap=%~1) && goto exec_jsc_dev
  echo invalid number of arguments for jsc %mode%
  goto fail_usage

  :exec_jsc_dev
    "%node%" "%base%jsc.js" "%mode%" "%bootstrap%" "%config_js%"
exit /b 0

:jsc_compile
  goto jsc_x

:jsc_identify
  if "%~1"=="" echo invalid number of arguments for jsc %mode% && goto fail_usage
  if not "%~2"=="" echo invalid number of arguments for jsc %mode% && goto fail_usage
  "%node%" "%base%jsc.js" "%mode%" "%~1"
exit /b 0

:jsc_inline
  if "%~1"=="" echo invalid number of arguments for jsc %mode% && goto fail_usage
  if "%~2"=="" echo invalid number of arguments for jsc %mode% && goto fail_usage

  set remaining=
  :jsc_inline_remaining
  if "%~1"=="" goto end_jsc_inline_remaining
  set remaining=%remaining% "%~1"
  shift
  goto jsc_inline_remaining
  :end_jsc_inline_remaining

  "%node%" "%base%jsc.js" "%mode%" "%config_js%" "%invoke_main%" "%main%" "%register_modules%" %remaining%
exit /b 0

:jsc_link
  goto jsc_x

:jsc_x
  if "%~1"=="" echo invalid number of arguments for jsc %mode% && goto fail_usage
  if "%~2"=="" echo invalid number of arguments for jsc %mode% && goto fail_usage

  set remaining=
  :jsc_x_remaining
  if "%~1"=="" goto end_jsc_x_remaining
  set remaining=%remaining% "%~1"
  shift
  goto jsc_x_remaining
  :end_jsc_x_remaining

  "%node%" "%base%jsc.js" "%mode%" "%config_js%" %remaining%
exit /b 0
