import { useLayoutEffect, useState } from 'react'

const useHeight = () => {
  const [height, setHeight] = useState(() => window.innerHeight)

  useLayoutEffect(() => {
    const setNewHeight = () => setHeight(window.innerHeight)
    window.addEventListener('resize', setNewHeight)
    return () => window.removeEventListener('resize', setNewHeight)
  }, [])

  return height
}

export default useHeight
