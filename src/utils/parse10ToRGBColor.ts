export const parse10ToRGBColor = (colorVal: string) => {
  const rgbColor = { red: 0, green: 0, blue: 0 }
  rgbColor.red = +colorVal & 0xff
  rgbColor.green = (+colorVal >> 8) & 0xff
  rgbColor.blue = (+colorVal >> 16) & 0xff
  return `rgb(${rgbColor.red},${rgbColor.green},${rgbColor.blue})`
}
