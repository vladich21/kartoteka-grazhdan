import { useEffect, useState } from 'react'
import { getCachedCitizenIndex, getCitizenIndex } from '../data/generate'

export function useCitizenIndex() {
  const [people, setPeople] = useState(getCachedCitizenIndex())

  useEffect(() => {
    if (people) return
    setPeople(getCitizenIndex())
  }, [])

  return people
}
