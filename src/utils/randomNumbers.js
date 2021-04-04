const getRandomNumber = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1))

const runOneOf = (callbacks) => {
  const index = getRandomNumber(0, callbacks.length - 1)
  return callbacks[index]()
}

export const getRandomNumbersFactory = (minQuantity, maxQuantity, bounds) => {
  const callbacks = bounds.map(([min, max]) => () => getRandomNumber(min, max))

  return () => {
    const quantity = getRandomNumber(minQuantity, maxQuantity)
    return [...Array(quantity)].map(() => runOneOf(callbacks))
  }
}
