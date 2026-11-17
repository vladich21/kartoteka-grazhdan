import type { CitizenListItem } from '../types'

type Filters = {
  search: string
  region: string
  status: string
  gender: string
  onlyBenefits: boolean
}

export function filterPeople(people: CitizenListItem[], filters: Filters) {
  const query = filters.search.trim().toLowerCase()
  const result: CitizenListItem[] = []

  for (let index = 0; index < people.length; index++) {
    const person = people[index]

    if (filters.region && person.region !== filters.region) {
      continue
    }

    if (filters.status && person.status !== filters.status) {
      continue
    }

    if (filters.gender && person.gender !== filters.gender) {
      continue
    }

    if (filters.onlyBenefits && !person.hasBenefits) {
      continue
    }

    if (query) {
      const fullText = [
        person.lastName,
        person.firstName,
        person.middleName,
        person.snils,
        person.city,
      ].join(' ').toLowerCase()

      if (!fullText.includes(query)) {
        continue
      }
    }

    result.push(person)
  }

  return result
}
