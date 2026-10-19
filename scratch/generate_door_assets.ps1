Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("assets\grand-door-entrance.jpg")
$W = $src.Width
$H = $src.Height

# Bounding box of the double doors:
# Left = 138, Right = 724, Width = 586
# Center seam = 431
# Top apex = 92, Spring line at hinges (left x=138, y=175; right x=724, y=175)
# Bottom = 1104, Height = 1012

# Create Left Door Bitmap: width = 431 - 138 = 293, height = 1012
$leftW = 431 - 138
$doorH = 1104 - 92
$leftBmp = New-Object System.Drawing.Bitmap($leftW, $doorH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gLeft = [System.Drawing.Graphics]::FromImage($leftBmp)
$gLeft.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Build Arch Path for Left Door
$pathLeft = New-Object System.Drawing.Drawing2D.GraphicsPath
# Top curve points from hinge (0, 83) to apex (293, 0)
# (y coordinates relative to 92: top apex is 92-92=0, hinge at y=175 is 175-92=83)
$pathLeft.AddArc(0, 0, ($leftW * 2), 170, 180, 90)
$pathLeft.AddLine($leftW, 85, $leftW, $doorH)
$pathLeft.AddLine($leftW, $doorH, 0, $doorH)
$pathLeft.CloseFigure()

$gLeft.SetClip($pathLeft)
# Draw the left door slice from source image
$srcRectLeft = New-Object System.Drawing.Rectangle(138, 92, $leftW, $doorH)
$destRectLeft = New-Object System.Drawing.Rectangle(0, 0, $leftW, $doorH)
$gLeft.DrawImage($src, $destRectLeft, $srcRectLeft, [System.Drawing.GraphicsUnit]::Pixel)
$gLeft.Dispose()
$leftBmp.Save("assets\door-left.png", [System.Drawing.Imaging.ImageFormat]::Png)
$leftBmp.Dispose()
Write-Host "door-left.png saved."

# Create Right Door Bitmap: width = 724 - 431 = 293, height = 1012
$rightW = 724 - 431
$rightBmp = New-Object System.Drawing.Bitmap($rightW, $doorH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gRight = [System.Drawing.Graphics]::FromImage($rightBmp)
$gRight.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Build Arch Path for Right Door: from apex (0, 0) to hinge (293, 83)
$pathRight = New-Object System.Drawing.Drawing2D.GraphicsPath
$pathRight.AddArc(-$rightW, 0, ($rightW * 2), 170, 270, 90)
$pathRight.AddLine($rightW, 85, $rightW, $doorH)
$pathRight.AddLine($rightW, $doorH, 0, $doorH)
$pathRight.CloseFigure()

$gRight.SetClip($pathRight)
$srcRectRight = New-Object System.Drawing.Rectangle(431, 92, $rightW, $doorH)
$destRectRight = New-Object System.Drawing.Rectangle(0, 0, $rightW, $doorH)
$gRight.DrawImage($src, $destRectRight, $srcRectRight, [System.Drawing.GraphicsUnit]::Pixel)
$gRight.Dispose()
$rightBmp.Save("assets\door-right.png", [System.Drawing.Imaging.ImageFormat]::Png)
$rightBmp.Dispose()
Write-Host "door-right.png saved."

# Create Frame Surround with Doorway Cutout (Transparent where doors open)
$frameBmp = New-Object System.Drawing.Bitmap($W, $H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gFrame = [System.Drawing.Graphics]::FromImage($frameBmp)
$gFrame.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
# Draw entire source image
$gFrame.DrawImage($src, 0, 0, $W, $H)

# Cut out doorway with clear composite mode
$gFrame.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
$clearBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Transparent)

# Doorway arch cutout path in full frame coordinates:
$cutoutPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$cutoutPath.AddArc(138, 92, 586, 170, 180, 180)
$cutoutPath.AddLine(724, 177, 724, 1104)
$cutoutPath.AddLine(724, 1104, 138, 1104)
$cutoutPath.CloseFigure()

$gFrame.FillPath($clearBrush, $cutoutPath)
$clearBrush.Dispose()
$gFrame.Dispose()
$frameBmp.Save("assets\door-frame.png", [System.Drawing.Imaging.ImageFormat]::Png)
$frameBmp.Dispose()
Write-Host "door-frame.png saved."

$src.Dispose()
Write-Host "All door assets generated successfully!"
