import path from "path"

const appDir = process.cwd()

const resolveApp = (relativePath: string) => {
  return path.resolve(appDir, relativePath)
}

export default resolveApp
