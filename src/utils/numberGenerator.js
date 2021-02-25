import { randomNumber } from '@utils/randomNumber'
import { runOneOf } from '@utils/runOneOf'

export function * numberGenerator (...bounds) {
  const callbacks = bounds.map(([min, max]) => () => randomNumber({ min, max }))
  while (true) yield runOneOf(...callbacks)
}
