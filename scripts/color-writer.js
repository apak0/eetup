// Generate css variables from colors object and write to generated-colors.css file

import fs from 'fs'
import path from 'path'

import { colors } from '../src/styles/colors/colors.js'

const generateCSSVariables = (obj, prefix = '') => {
  let cssVariables = '\n'
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      cssVariables += generateCSSVariables(value, `${prefix}${key}-`)
    } else {
      cssVariables += `--color-${prefix}${key}: ${value};\n`
    }
  }
  return cssVariables
}

const convertedColors = generateCSSVariables(colors)

const fileContent = `@theme inline { ${convertedColors} }`

fs.writeFileSync(path.resolve(path.dirname('./'), './src/styles/colors/generated-colors.css'), fileContent)
console.log('✅ CSS variables generated!')
