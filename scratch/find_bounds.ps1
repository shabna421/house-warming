Add-Type -AssemblyName System.Drawing

$inputPath = "assets\grand-door-entrance.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)

# Find left edge of door around x in [130..170] at y = 600
for ($x = 120; $x -le 165; $x++) {
    $p = $bmp.GetPixel($x, 600)
    # Stone has G > 120, Wood has G < 90
    if ($p.G -lt 85 -and $p.B -lt 55) {
        Write-Host "Left door boundary found at x = $x (R=$($p.R) G=$($p.G) B=$($p.B))"
        $leftDoorX = $x
        break
    }
}

# Find right edge of door around x in [700..745] at y = 600
for ($x = 735; $x -ge 690; $x--) {
    $p = $bmp.GetPixel($x, 600)
    if ($p.G -lt 85 -and $p.B -lt 55) {
        Write-Host "Right door boundary found at x = $x (R=$($p.R) G=$($p.G) B=$($p.B))"
        $rightDoorX = $x
        break
    }
}

# Find bottom sill of door along x = 448 (center)
for ($y = 1150; $y -ge 1000; $y--) {
    $p = $bmp.GetPixel(448, $y)
    # Sill is stone (G > 120, R > 150)
    if ($p.R -lt 110 -and $p.G -lt 70) {
        Write-Host "Bottom door boundary found at y = $y (R=$($p.R) G=$($p.G) B=$($p.B))"
        $bottomDoorY = $y
        break
    }
}

# Find top of arch along x = 448
for ($y = 80; $y -le 250; $y++) {
    $p = $bmp.GetPixel(448, $y)
    # Arch stone is light, door wood starts
    if ($p.R -lt 120 -and $p.G -lt 75 -and $p.B -lt 40) {
        Write-Host "Top arch apex found at y = $y (R=$($p.R) G=$($p.G) B=$($p.B))"
        $topArchY = $y
        break
    }
}

$bmp.Dispose()
