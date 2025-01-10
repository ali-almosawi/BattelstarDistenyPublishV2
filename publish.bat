@echo off
setlocal enabledelayedexpansion

REM Change to the specific publish folder
cd /d "%~dp0"

REM Move all files and folders except index.html and 404.html
for /d %%d in (wwwroot\*) do (
    if /i not "%%d"=="wwwroot\index.html" if /i not "%%d"=="wwwroot\404.html" (
        move /Y "%%d" .
    )
)

for %%f in (wwwroot\*) do (
    if /i not "%%~nxf"=="index.html" if /i not "%%~nxf"=="404.html" (
        move /Y "%%f" .
    )
)

REM Remove the wwwroot folder if empty
if not exist "wwwroot\*" rmdir /s /q "wwwroot"

echo All operations completed.
pause
