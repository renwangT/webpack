import { useState } from "react"

export const useToLocaleUpperCase = (defaultValue = ""): [string, (value: string) => void] => {
  const [value, setState] = useState<string>(defaultValue)
  const handleChange = (value: string) => {
    setState(value.toLocaleUpperCase())
  }
  return [value, handleChange]
}
