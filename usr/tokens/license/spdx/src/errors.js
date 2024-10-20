class InvalidFormatError extends Error {
  constructor(message = '') {
    super(`SPDX parse error: ` + message)
  }
}

export { InvalidFormatError }
