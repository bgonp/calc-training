import { useCallback, useState } from 'react'

import { BOUNDS, MAX_QUANTITY, MIN_QUANTITY } from '@constants/numbers'
import { numberGenerator } from '@utils/numberGenerator'
import { randomNumber } from '@utils/randomNumber'

const generator = numberGenerator(...BOUNDS)
const quantity = { min: MIN_QUANTITY, max: MAX_QUANTITY }
const getNextNumbers = () => [...Array(randomNumber(quantity))].map(() => generator.next().value)

const useRandomNumbers = () => {
  const [numbers, setNumbers] = useState(getNextNumbers)

  const nextNumbers = useCallback(() => {
    setNumbers(getNextNumbers())
  }, [])

  return [numbers, nextNumbers]
}

export default useRandomNumbers
