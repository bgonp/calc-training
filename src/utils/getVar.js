export const getVar = (key) => typeof process !== 'undefined'
  ? process.env[key]
  : import.meta.env[key]
