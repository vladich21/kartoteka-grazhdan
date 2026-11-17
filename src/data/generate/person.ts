import type { CitizenStatus, Gender } from '../../types'
import {
  FIRST_NAMES_F,
  FIRST_NAMES_M,
  LAST_NAMES_F,
  LAST_NAMES_M,
  MIDDLE_NAMES_F,
  MIDDLE_NAMES_M,
  REGIONS,
  STREETS,
} from '../dictionaries'
import { chance, pad, pick } from '../rng'
import { STATUS_WEIGHTS } from './constants'

export function pickStatus(rng: () => number): CitizenStatus {
  const roll = rng()
  let sum = 0

  for (const item of STATUS_WEIGHTS) {
    sum += item.weight
    if (roll <= sum) return item.status
  }

  return 'active'
}

export function makeSnils(rng: () => number) {
  const part1 = pad(Math.floor(rng() * 1000), 3)
  const part2 = pad(Math.floor(rng() * 1000), 3)
  const part3 = pad(Math.floor(rng() * 1000), 3)
  const part4 = pad(Math.floor(rng() * 100), 2)
  return `${part1}-${part2}-${part3} ${part4}`
}

export function makeInn(rng: () => number) {
  let inn = ''

  for (let index = 0; index < 12; index++) {
    inn += Math.floor(rng() * 10)
  }

  return inn
}

export function makePhone(rng: () => number) {
  const code = pick(rng, ['903', '905', '916', '925', '926', '977', '999'])
  const first = pad(Math.floor(rng() * 1000), 3)
  const second = pad(Math.floor(rng() * 100), 2)
  const third = pad(Math.floor(rng() * 100), 2)
  return `+7 (${code}) ${first}-${second}-${third}`
}

export function makeAddress(rng: () => number) {
  const region = pick(rng, REGIONS)
  const city = pick(rng, region.cities)

  return {
    region: region.name,
    city,
    street: pick(rng, STREETS),
    house: String(1 + Math.floor(rng() * 120)),
    apartment: String(1 + Math.floor(rng() * 200)),
    postalCode: pad(100000 + Math.floor(rng() * 899999), 6),
  }
}

export function buildName(rng: () => number, gender: Gender) {
  if (gender === 'male') {
    return {
      lastName: pick(rng, LAST_NAMES_M),
      firstName: pick(rng, FIRST_NAMES_M),
      middleName: pick(rng, MIDDLE_NAMES_M),
    }
  }

  return {
    lastName: pick(rng, LAST_NAMES_F),
    firstName: pick(rng, FIRST_NAMES_F),
    middleName: pick(rng, MIDDLE_NAMES_F),
  }
}

export function randomGender(rng: () => number): Gender {
  if (chance(rng, 0.5)) return 'male'
  return 'female'
}
