Add-Type -AssemblyName System.Drawing

$sourcePath = "d:\ANUSHA\EcoQuest\characters_sheet.png"
$outDir = "d:\ANUSHA\EcoQuest\avatars"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir }

$src = [System.Drawing.Bitmap]::FromFile($sourcePath)

$coords = @(
    @{ name = "verda";  x = 55;  y = 50;  w = 385; h = 385 },
    @{ name = "lumia";  x = 510; y = 50;  w = 385; h = 385 },
    @{ name = "aqua";   x = 965; y = 50;  w = 385; h = 385 },
    @{ name = "solina"; x = 55;  y = 560; w = 385; h = 385 },
    @{ name = "eco";    x = 510; y = 560; w = 385; h = 385 },
    @{ name = "nova";   x = 965; y = 560; w = 385; h = 385 }
)

foreach ($c in $coords) {
    $rect = New-Object System.Drawing.Rectangle($c.x, $c.y, $c.w, $c.h)
    $target = New-Object System.Drawing.Bitmap($c.w, $c.h)
    $g = [System.Drawing.Graphics]::FromImage($target)
    $g.DrawImage($src, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $savePath = Join-Path $outDir "$($c.name).png"
    $target.Save($savePath, [System.Drawing.Imaging.ImageFormat]::Png)
    $target.Dispose()
    Write-Host "Overwritten with new character sheet avatar: $savePath"
}

$src.Dispose()
Write-Host "New character sheet extraction complete!"
