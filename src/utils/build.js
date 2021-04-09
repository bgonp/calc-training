import path from 'path'

const getFileName = (filename) => path.basename(filename, '.module.css')

const hash = (content) => content
  .split('')
  .reduce(
    (acc, letter) => Math.imul(31, acc) + letter.charCodeAt(0) | 0,
    Math.ceil(Math.random() * 1000)
  )
  .toString(36)
  .substr(-5)

export const generateScopedName = () => {
  const hashes = {}

  return (name, file, css) => {
    if (!hashes[file]) hashes[file] = {}
    if (!hashes[file][name]) hashes[file][name] = hash(css)

    return `${getFileName(file)}__${name}--${hashes[file][name]}`
  }
}
