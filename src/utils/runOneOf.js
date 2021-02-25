import { randomNumber } from '@utils/randomNumber'

export const runOneOf = (...callbacks) => {
  const index = randomNumber({ max: callbacks.length - 1 })
  if (typeof callbacks[index] !== 'function') throw new Error('Invalid callback')
  return callbacks[index]()
}
