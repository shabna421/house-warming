Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("assets\full-wooden-door.jpg")
$W = $src.Width
$H = $src.Height
$midX = [int]($W / 2)

Write-Host "Source image: $W x $H, midX = $midX"

# Left Door (0 to midX)
$leftBmp = New-Object System.Drawing.Bitmap($midX, $H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gLeft = [System.Drawing.Graphics]::FromImage($leftBmp)
$gLeft.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRectLeft = New-Object System.Drawing.Rectangle(0, 0, $midX, $H)
$destRectLeft = New-Object System.Drawing.Rectangle(0, 0, $midX, $H)
$gLeft.DrawImage($src, $destRectLeft, $srcRectLeft, [System.Drawing.GraphicsUnit]::Pixel)
$gLeft.Dispose()
$leftBmp.Save("assets\full-door-left.png", [System.Drawing.Imaging.ImageFormat]::Png)
$leftBmp.Dispose()
Write-Host "full-door-left.png saved."

# Right Door (midX to W)
$rightW = $W - $midX
$rightBmp = New-Object System.Drawing.Bitmap($rightW, $H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gRight = [System.Drawing.Graphics]::FromImage($rightBmp)
$gRight.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRectRight = New-Object System.Drawing.Rectangle($midX, 0, $rightW, $H)
$destRectRight = New-Object System.Drawing.Rectangle(0, 0, $rightW, $H)
$gRight.DrawImage($src, $destRectRight, $srcRectRight, [System.Drawing.GraphicsUnit]::Pixel)
$gRight.Dispose()
$rightBmp.Save("assets\full-door-right.png", [System.Drawing.Imaging.ImageFormat]::Png)
$rightBmp.Dispose()
Write-Host "full-door-right.png saved."

$src.Dispose()
Write-Host "Both full-screen door leaves created successfully!"
