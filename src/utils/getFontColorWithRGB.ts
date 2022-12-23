export const getFontColorWithRGB = (rgbColor: string) => {
  const colors = rgbColor.replace(/rgb|RGB|\(|\)/g, "").split(",")
  const rgb = {
    red: colors[0] || 0,
    green: colors[1] || 0,
    blue: colors[2] || 0
  }
  const brightness = +rgb.red * 0.299 + +rgb.green * 0.587 + +rgb.blue * 0.114
  return brightness > 192 ? "#000" : "#fff"
}
