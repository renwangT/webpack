export const objKeys = <T extends object>(obj: T): (keyof T)[] => Object.keys(obj) as (keyof T)[]
