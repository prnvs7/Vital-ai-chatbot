$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$frontendCommand = "Set-Location '$root\frontend'; npm run dev -- --host 127.0.0.1 --port 5173"
$backendCommand = "Set-Location '$root\backend'; & '$root\.venv\Scripts\python.exe' -m uvicorn main:app --reload --host 127.0.0.1 --port 8000"

$frontendProcess = Start-Process powershell -PassThru -ArgumentList @(
  '-NoLogo',
  '-NoProfile',
  '-NoExit',
  '-ExecutionPolicy',
  'Bypass',
  '-Command',
  $frontendCommand
)

$backendProcess = Start-Process powershell -PassThru -ArgumentList @(
  '-NoLogo',
  '-NoProfile',
  '-NoExit',
  '-ExecutionPolicy',
  'Bypass',
  '-Command',
  $backendCommand
)

Write-Host 'Frontend: http://127.0.0.1:5173/'
Write-Host 'Backend: http://127.0.0.1:8000/'

Wait-Process -Id $frontendProcess.Id, $backendProcess.Id