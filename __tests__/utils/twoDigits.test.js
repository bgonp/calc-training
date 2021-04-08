import { twoDigits } from 'utils/twoDigits'

describe('twoDigits', () => {
  test('should return same number as string', () => {
    expect(twoDigits(10)).toBe('10')
  })

  test('should return number with left 0', () => {
    expect(twoDigits(5)).toBe('05')
  })

  test('should return last two digits', () => {
    expect(twoDigits(123)).toBe('23')
  })
})
