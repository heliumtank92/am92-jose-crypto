/** @ignore */
export function jsonParse(string: any): any {
  try {
    return JSON.parse(string)
  } catch (error) {
    return string
  }
}

/** @ignore */
export function derToPem(derKey: string, keyType: string): string {
  const prefix = `-----BEGIN ${keyType}-----\n`
  const postfix = `-----END ${keyType}-----`
  const pemKey = prefix + (derKey.match(/.{0,64}/g) || []).join('\n') + postfix
  return pemKey
}
