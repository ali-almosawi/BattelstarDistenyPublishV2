

# Get all files in the directory and subdirectories, recursively
Get-ChildItem -Recurse -File | ForEach-Object {
    # Create the new file name by converting it to lowercase
    $newName = $_.Name.ToLower()

    # Check if the new name is different from the current name
    if ($newName -ne $_.Name) {
        # Create the full path of the new file name
        $newFilePath = Join-Path -Path $_.DirectoryName -ChildPath $newName

        # Check if the new file path already exists (to avoid overwriting)
        if (-not (Test-Path -Path $newFilePath)) {
            try {
                # Rename the file
                Rename-Item -Path $_.FullName -NewName $newFilePath
                Write-Host "Renamed: $($_.FullName) -> $newFilePath"
            }
            catch {
                Write-Host "Error renaming file: $($_.FullName) -> $newFilePath"
                Write-Host "Error details: $_"
            }
        } else {
            Write-Host "Skipping rename (file already exists): $newFilePath"
        }
    } else {
        Write-Host "No change needed: $($_.FullName)"
    }
}
