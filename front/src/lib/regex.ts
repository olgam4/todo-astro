function cookieRegex(name: string) {
  return new RegExp("(^| )" + name + "=([^;]+)")
}

function hashTagRegex() {
  return /(#[a-zA-Z0-9_]+)/g
}

export {
  cookieRegex,
  hashTagRegex,
}
