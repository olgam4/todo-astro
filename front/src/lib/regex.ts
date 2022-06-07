function cookieRegex(name: string) {
  return new RegExp("(^| )" + name + "=([^;]+)")
}

function hashTagRegex() {
  return /(^|\s)([#][a-z\d-]+)/gim
}

export {
  cookieRegex,
  hashTagRegex,
}
