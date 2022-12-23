export const hexToRgb = (hexValue: string) => {
  // hex 转 rgba
  const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const hex = hexValue.replace(rgx, function (_m, r, g, b) {
    return r + r + g + g + b + b
  })
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!rgb) {
    return hexValue
  }
  const r = parseInt(rgb[1], 16)
  const g = parseInt(rgb[2], 16)
  const b = parseInt(rgb[3], 16)
  return `rgb(${r}, ${g}, ${b})`
}
