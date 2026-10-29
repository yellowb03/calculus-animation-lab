@echo off
where pythonw >nul 2>nul
if %errorlevel%==0 (
  start "" /b pythonw "%~dp0tts_server.py"
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    start "" /b python "%~dp0tts_server.py"
  )
)
start "" "%~dp0index.html"
