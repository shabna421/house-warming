Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("assets\grand-door-entrance.jpg")

$points = @()
for ($x = 136; $x -le 725; $x += 30) {
    for ($y = 80; $y -le 350; $y++) {
        $p = $bmp.GetPixel($x, $y)
        # Check when wood starts (R < 130 and G < 90 and B < 55)
        if ($p.R -lt 130 -and $p.G -lt 85 -and $p.B -lt 55) {
            Write-Host "x=$x archTopY=$y"
            break
        }
    }
}

$bmp.Dispose()
