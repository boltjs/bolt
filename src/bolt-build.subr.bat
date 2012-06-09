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

set count_targets=0
set count_entry_point=0
set count_entry_group_name=0

:parse_flags
  set flag=%~1
  if not "%flag:~0,1%"=="-" goto done_parse_flags
  shift

  if "%flag%"=="-c" goto parse_config
  if "%flag%"=="--config" goto parse_config
  if "%flag%"=="-o" goto parse_output
  if "%flag%"=="--output" goto parse_output
  if "%flag%"=="-s" goto parse_src
  if "%flag%"=="--src-dir" goto parse_src
  if "%flag%"=="-n" goto parse_invoke
  if "%flag%"=="--invoke-main" goto parse_invoke
  if "%flag%"=="-r" goto parse_register
  if "%flag%"=="--register" goto parse_register
  if "%flag%"=="-i" goto parse_inline
  if "%flag%"=="--inline" goto parse_inline
  if "%flag%"=="-m" goto parse_modules
  if "%flag%"=="--modules" goto parse_modules
  if "%flag%"=="-e" goto parse_points
  if "%flag%"=="--entry-points" goto parse_points
  if "%flag%"=="-g" goto parse_group
  if "%flag%"=="--entry-group" goto parse_group
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

  :parse_src
    if "%~1"=="" echo %flag% requires an argument to be specified && goto fail_usage
    set src_dir=%~1
    shift
  goto parse_flags

  :parse_invoke
    if "%~1"=="" echo %flag% requires an argument to be specified && goto fail_usage
    set invoke_main_flag=-n "%~1"
    shift
  goto parse_flags

  :parse_register
    set register_modules_flag=-r
  goto parse_flags

  :parse_inline
    set generate_inline=true
  goto parse_flags

  :parse_modules
    set generate_modules=true
  goto parse_modules

  :parse_points
    :point_loop
      set entry=%~1
      if "%entry%"=="" goto end_point_loop
      if "%entry:~0,1%"=="-" goto end_point_loop
      shift

      if not exist "%entry%" echo specified file for entry point not found [%entry%] && goto fail
      call :is_dir "%entry%"
      if %errorlevel%==0 echo specified file for entry point not found [%entry%] && goto fail

      set entry_point_%count_entry_point%="%entry%"
      set /a count_entry_point=%count_entry_point% + 1
    goto point_loop
    :end_point_loop
  goto parse_modules

  :parse_group
    echo --entry-group parsing not implemented.
    exit /b 1
  goto parse_modules

:done_parse_flags

if "%config_js%"=="" set config_js=config/bolt/prod.js
if "%output_dir%"=="" set output_dir=scratch/main/js
if "%src_dir%"=="" set src_dir=src/main/js
if "%generate_inline%"=="" set generate_inline=false
if "%generate_modules%"=="" set generate_modules=false



echo Windows support for bolt build is currently not implemented.
exit /b 1
