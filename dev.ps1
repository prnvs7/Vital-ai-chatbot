$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host 'Frontend: http://127.0.0.1:5173/'
Write-Host 'Backend: http://127.0.0.1:8000/'
Write-Host 'Press Ctrl+C to stop both servers.'

$frontendJob = Start-Job -Name 'FrontendDevServer' -ArgumentList $root -ScriptBlock {
  param($workspaceRoot)
  Set-Location (Join-Path $workspaceRoot 'frontend')
  npm run dev -- --host 127.0.0.1 --port 5173
}

$backendJob = Start-Job -Name 'BackendDevServer' -ArgumentList $root -ScriptBlock {
  param($workspaceRoot)
  Set-Location (Join-Path $workspaceRoot 'backend')
  & (Join-Path $workspaceRoot '.venv\Scripts\python.exe') -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
}

Wait-Job -Job $frontendJob, $backendJob