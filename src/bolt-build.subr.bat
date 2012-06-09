@echo off

goto entry

:usage
  echo usage: bolt build [-c^|--config CONFIG_JS] [-o^|--output OUTPUT_DIR] [-s^|--src-dir SRC_DIR]
  echo                   [-i^|--inline] [-n^|--invoke-main MAIN_MODULE] [-r^|--register]
  echo                   [-m^|--modules] [-e^|--entry-points FILE ...] [-g^|--entry-group NAME FILE ...]
  echo.
  echo options:
  echo   -c^|--config CONFIG_JS         override bolt configuration file
  echo                                    default: config/bolt/prod.js
  echo   -o^|--output OUTPUT_DIR         override output directory, note this is different
  echo                                  to the jsc compile directory, the compiled output,
  echo                                  will be located at $OUTPUT_DIR/compile
  echo                                    default: scratch/main/js
  echo   -s^|--src-dir SRC_DIR           override source directory
  echo                                    default: src/main/js
  echo   -i^|--inline                    enable generation of inline scripts (only produces output
  echo                                  in conjunction with -e or -g).
  echo   -n^|--invoke-main MAIN_MODULE   specify main module of inline scripts.
  echo   -r^|--register                  register modules in global namespace for inline scripts,
  echo                                  this will default to true unless -n is specified.
  echo   -m^|--modules                   enable generation of flat module files.
  echo   -e^|--entry-points FILE ...     specify a set of entry points, a compiled output
  echo                                  will be generated for each entry point. Multiple
  echo                                  -e flags may be specified.
  echo   -g^|--entry-group NAME FILE ... specify an entry group, a single compiled output
  echo                                  will be generated with NAME for each entry-group.
  echo                                  Multiple -g flags may be specified.
  echo.
  echo example:
  echo   Produce a bolt build for a top level application. A compiled file will be
  echo   generated for each Main module in this example.
  echo.
  echo     bolt build -e src/main/js/**/*Main.js
  echo.
  echo.
  echo   Produce a bolt build for a top level library. A self contained script registering
  echo   all modules in their namespace will be produced.
  echo.
  echo     bolt build -i -g example src/main/js/**/api/*.js
  echo.
  echo.
  echo   Produce a bolt build for a general purpose library, in this build we only want
  echo   modules to be produced, no compiled output.
  echo.
  echo     bolt build -m src/main/js

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

if "%help_mode%"=="true" call :usage && exit /b 0

echo Windows support for bolt build is currently not implemented.
exit /b 1
