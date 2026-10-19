Add-Type -AssemblyName System.Drawing

$inputPath = "assets\grand-door-entrance.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)

Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

# Sample horizontal slice at y = 600 (mid-height) to find left door edge, center seam, right door edge
$y = 600
$colors = @()
for ($x = 100; $x -lt 800; $x += 10) {
    $pixel = $bmp.GetPixel($x, $y)
    # Check brightness or RGB
    if ($x % 50 -eq 0) {
        Write-Host "x=$x R=$($pixel.R) G=$($pixel.G) B=$($pixel.B)"
    }
}

$bmp.Dispose()
