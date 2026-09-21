# Script de Instalación de React Rules & Skills para Windows PowerShell
param (
    [switch]$Global,
    [string]$TargetPath
)

$SourceDir = $PSScriptRoot
if (-not $SourceDir) {
    $SourceDir = Get-Location
}
$SourceRules = Join-Path $SourceDir "rules"
$SourceSkills = Join-Path $SourceDir "skills"

if ($Global) {
    $TargetBase = Join-Path $HOME ".gemini\config"
} elseif ($TargetPath) {
    $TargetBase = Join-Path (Resolve-Path $TargetPath) ".agents"
} else {
    $TargetBase = Join-Path (Get-Location) ".agents"
}

Write-Host "=== Instalador de React Rules & Skills (PowerShell) ===" -ForegroundColor Cyan
Write-Host "Origen: $SourceDir"
Write-Host "Destino: $TargetBase`n"

if (Test-Path $SourceRules) {
    $DestRules = Join-Path $TargetBase "rules"
    New-Item -ItemType Directory -Force -Path $DestRules | Out-Null
    Copy-Item -Path "$SourceRules\*" -Destination $DestRules -Recurse -Force
    Write-Host "Reglas instaladas en: $DestRules" -ForegroundColor Green
}

if (Test-Path $SourceSkills) {
    $DestSkills = Join-Path $TargetBase "skills"
    New-Item -ItemType Directory -Force -Path $DestSkills | Out-Null
    Copy-Item -Path "$SourceSkills\*" -Destination $DestSkills -Recurse -Force
    Write-Host "Habilidades instaladas en: $DestSkills" -ForegroundColor Green
}

Write-Host "`nInstalación completada con éxito." -ForegroundColor Yellow
