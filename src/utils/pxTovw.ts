export const pxTovw = (px: string | number, UIW = 750): string => {
  const translate = (px: number): string => ((px / UIW) * 100).toFixed(3) + "vw"
  if (typeof px === "number") {
    return translate(px)
  } else {
    const n = parseInt(px)
    if (!isNaN(n)) {
      return translate(n)
    } else {
      return translate(0)
    }
  }
}
