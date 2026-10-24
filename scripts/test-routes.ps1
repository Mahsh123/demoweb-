$proc = Start-Process -FilePath "npx.cmd" -ArgumentList "next", "start", "-p", "3005" -PassThru -NoNewWindow
Start-Sleep -Seconds 5

$routes = @(
  "/",
  "/menu",
  "/offers",
  "/about",
  "/locations",
  "/cart",
  "/checkout",
  "/order-confirmation"
)

$results = @()

foreach ($r in $routes) {
  $url = "http://localhost:3005$r"
  try {
    $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 6
    $results += [PSCustomObject]@{ Route = $r; Status = $res.StatusCode; Length = $res.Content.Length }
  } catch {
    $results += [PSCustomObject]@{ Route = $r; Status = "ERROR"; Error = $_.Exception.Message }
  }
}

$results | Format-Table -AutoSize | Out-String | Write-Host

Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*3005*" } | Stop-Process -Force -ErrorAction SilentlyContinue
