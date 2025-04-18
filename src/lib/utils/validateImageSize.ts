type ValidateImageOptions = {
  maxSizeMB?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

type ValidationResult = { valid: true; width: number; height: number } | { valid: false; reason: string }

export async function validateImageFile(file: File, options: ValidateImageOptions = {}): Promise<ValidationResult> {
  const { maxSizeMB = 2, minWidth = 0, minHeight = 0, maxWidth = Infinity, maxHeight = Infinity } = options

  // ✅ Validate file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, reason: `File size exceeds ${maxSizeMB}MB.` }
  }

  // ✅ Load image to check dimensions
  const imageUrl = URL.createObjectURL(file)
  const img = new Image()

  return new Promise((resolve) => {
    img.onload = () => {
      const { width, height } = img

      URL.revokeObjectURL(imageUrl)

      if (width < minWidth || height < minHeight) {
        return resolve({
          valid: false,
          reason: `Image must be at least ${minWidth}x${minHeight}px.`,
        })
      }

      if (width > maxWidth || height > maxHeight) {
        return resolve({
          valid: false,
          reason: `Image must be at most ${maxWidth}x${maxHeight}px.`,
        })
      }

      resolve({ valid: true, width, height })
    }

    img.onerror = () => {
      URL.revokeObjectURL(imageUrl)
      resolve({ valid: false, reason: 'Failed to load image.' })
    }

    img.src = imageUrl
  })
}
