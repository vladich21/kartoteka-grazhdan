import type { CitizenListItem, Gender } from '../../types'
import { chance, makeRng, randomDate } from '../rng'
import { TOTAL_CITIZENS } from './constants'
import { buildName, makeAddress, makeSnils, pickStatus } from './person'

export function getListItem(id: number): CitizenListItem {
  const rng = makeRng(id * 2654435761)
  const gender: Gender = chance(rng, 0.49) ? 'male' : 'female'
  const name = buildName(rng, gender)
  const address = makeAddress(rng)

  return {
    id,
    lastName: name.lastName,
    firstName: name.firstName,
    middleName: name.middleName,
    birthDate: randomDate(rng, 1948, 2010),
    gender,
    snils: makeSnils(rng),
    region: address.region,
    city: address.city,
    status: pickStatus(rng),
    hasBenefits: chance(rng, 0.28),
  }
}

let cachedIndex: CitizenListItem[] | null = null

export function getCachedCitizenIndex() {
  return cachedIndex
}

export function getCitizenIndex() {
  if (cachedIndex) return cachedIndex

  const list: CitizenListItem[] = []
  for (let id = 1; id <= TOTAL_CITIZENS; id++) {
    list.push(getListItem(id))
  }

  cachedIndex = list
  return list
}
