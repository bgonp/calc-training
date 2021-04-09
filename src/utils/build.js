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
  const getHash = (name, content) => {
    if (!hashes[name]) hashes[name] = hash(content)
    return hashes[name]
  }

  return (name, filename, css) =>
    `${getFileName(filename)}__${name}--${getHash(name, css)}`
}
