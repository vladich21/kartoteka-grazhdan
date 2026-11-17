import type { CitizenListItem } from '../types'
import { REGIONS } from './dictionaries'
import { ageFromBirth, getCitizenIndex, TOTAL_CITIZENS } from './generate'

export function buildDashboardStats() {
  const all = getCitizenIndex()
  const sample = takeSample(all, 8000)
  const scale = TOTAL_CITIZENS / sample.length

  const byRegion: Record<string, number> = {}
  for (let index = 0; index < REGIONS.length; index++) {
    byRegion[REGIONS[index].name] = 0
  }

  const byStatus: Record<string, number> = {
    active: 0,
    temporary: 0,
    archived: 0,
    deceased: 0,
  }
  const ages = [
    { name: '0-17', min: 0, max: 17, count: 0 },
    { name: '18-30', min: 18, max: 30, count: 0 },
    { name: '31-45', min: 31, max: 45, count: 0 },
    { name: '46-60', min: 46, max: 60, count: 0 },
    { name: '61+', min: 61, max: 200, count: 0 },
  ]

  let withBenefits = 0
  let maleCount = 0

  for (let index = 0; index < sample.length; index++) {
    const person = sample[index]

    byRegion[person.region] = (byRegion[person.region] || 0) + 1
    byStatus[person.status] += 1

    if (person.hasBenefits) {
      withBenefits += 1
    }

    if (person.gender === 'male') {
      maleCount += 1
    }

    const age = ageFromBirth(person.birthDate)

    for (let bucketIndex = 0; bucketIndex < ages.length; bucketIndex++) {
      const bucket = ages[bucketIndex]

      if (age >= bucket.min && age <= bucket.max) {
        bucket.count += 1
        break
      }
    }
  }

  const regionChart = REGIONS.map((region) => ({
    name: shortRegion(region.name),
    value: Math.round((byRegion[region.name] || 0) * scale),
  }))

  const statusChart = Object.keys(byStatus).map((statusName) => ({
    name: statusName,
    value: Math.round(byStatus[statusName] * scale),
  }))

  const ageChart = ages.map((bucket) => ({
    name: bucket.name,
    value: Math.round(bucket.count * scale),
  }))

  return {
    total: TOTAL_CITIZENS,
    active: Math.round(byStatus.active * scale),
    withBenefits: Math.round(withBenefits * scale),
    minors: Math.round(ages[0].count * scale),
    maleShare: Math.round((maleCount / sample.length) * 100),
    femaleShare: Math.round(((sample.length - maleCount) / sample.length) * 100),
    regionChart,
    statusChart,
    ageChart,
    registrations: buildRegistrations(),
  }
}

function takeSample(list: CitizenListItem[], size: number) {
  const sample: CitizenListItem[] = []
  const step = Math.max(1, Math.floor(list.length / size))

  for (let index = 0; index < list.length; index += step) {
    sample.push(list[index])

    if (sample.length >= size) {
      break
    }
  }

  return sample
}

function shortRegion(regionName: string) {
  return regionName
    .replace('область', 'обл.')
    .replace('Республика ', '')
}

function buildRegistrations() {
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  const registrations = []

  for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
    let value = 700 + ((monthIndex * 137 + 40) % 500)

    if (monthIndex > 8) {
      value += 120
    }

    registrations.push({
      name: months[monthIndex],
      value,
    })
  }

  return registrations
}
