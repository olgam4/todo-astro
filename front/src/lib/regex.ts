function cookieRegex(name: string) {
  return new RegExp("(^| )" + name + "=([^;]+)")
}

export {
  cookieRegex,
}
