/** @ignore */
const { npm_package_name: pkgName = '', npm_package_version: pkgVersion = '' } =
  process.env

/** @ignore */
const SERVICE = `${pkgName}@${pkgVersion}`

export { SERVICE }
