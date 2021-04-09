import { getRandomNumbersFactory } from 'utils/randomNumbers'

describe('utils/getRandomNumbersFactory', () => {
  test('should return a numbers factory', () => {
    const getNumbers = getRandomNumbersFactory()
    expect(typeof getNumbers).toBe('function')
  })

  test('should return an array of one number', () => {
    const getNumbers = getRandomNumbersFactory()
    const numbers = getNumbers()
    expect(Array.isArray(numbers)).toBe(true)
  })

  test('should return a single random number', () => {
    const getNumbers = getRandomNumbersFactory()
    const numbers = getNumbers()
    expect(numbers.length).toBe(1)
    expect(numbers[0]).toBeGreaterThanOrEqual(0)
    expect(numbers[0]).toBeLessThanOrEqual(1000)
  })

  test('should return array with exact length', () => {
    const getNumbers = getRandomNumbersFactory(10, 10)
    const numbers = getNumbers()
    expect(numbers).toHaveLength(10)
  })

  test('should return array of different numbers', () => {
    const getNumbers = getRandomNumbersFactory(100, 100)
    const numbers = getNumbers()
    const withoutRepeated = numbers.reduce(
      (acc, number) => acc.includes(number) ? acc : acc.concat(number),
      []
    )
    expect(numbers.length).toBeGreaterThanOrEqual(withoutRepeated.length)
  })

  test('should return numbers between bounds', () => {
    const getNumbers = getRandomNumbersFactory(1000, 1000, [[10, 100]])
    const numbers = getNumbers()
    expect(numbers.filter(number => number < 10 || number > 100)).toHaveLength(0)
  })

  test('should return numbers between several bounds', () => {
    const getNumbers = getRandomNumbersFactory(1000, 1000, [[10, 10], [100, 100]])
    const numbers = getNumbers()
    expect(numbers.includes(10)).toBe(true)
    expect(numbers.includes(100)).toBe(true)
  })

  test('should return different numbers each time', () => {
    const getNumbers = getRandomNumbersFactory(1, 1, [[1, 1000]])
    const numbers1 = getNumbers()
    const numbers2 = getNumbers()
    expect(numbers1[0]).not.toBe(numbers2[0])
  })

  test('should return arrays with different length each time', () => {
    const getNumbers = getRandomNumbersFactory(1, 1000, [[10, 100]])
    const numbers1 = getNumbers()
    const numbers2 = getNumbers()
    expect(numbers1.length).not.toBe(numbers2.length)
  })
})
