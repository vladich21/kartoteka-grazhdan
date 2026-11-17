import type { Citizen } from '../../types'
import { POSITIONS } from '../dictionaries'
import { chance, makeRng, pad, pick, randomDate } from '../rng'
import { translit } from './format'
import { getListItem } from './list'
import { makeAddress, makeInn, makePhone } from './person'
import { buildRelated } from './related'

export function getCitizen(id: number): Citizen {
  const rng = makeRng(id * 2654435761)
  const base = getListItem(id)
  const reg = makeAddress(rng)
  reg.region = base.region
  reg.city = base.city

  const sameAddress = chance(rng, 0.7)
  const fact = sameAddress ? { ...reg } : makeAddress(rng)
  const phone = makePhone(rng)
  const email = `${translit(base.firstName)}.${translit(base.lastName)}${Math.floor(rng() * 90)}@mail.ru`.toLowerCase()
  const related = buildRelated(rng, base.gender, base.hasBenefits, phone, email)
  const currentJob = related.jobs.find((job) => job.isCurrent)

  return {
    id,
    lastName: base.lastName,
    firstName: base.firstName,
    middleName: base.middleName,
    birthDate: base.birthDate,
    gender: base.gender,
    citizenship: chance(rng, 0.94) ? 'РФ' : pick(rng, ['РФ', 'Беларусь', 'Казахстан', 'Армения']),
    birthPlace: `${base.region}, ${base.city}`,
    maritalStatus: pick(rng, ['single', 'married', 'divorced', 'widowed']),
    nationality: pick(rng, ['русская', 'татарская', 'не указана']),
    profession: pick(rng, POSITIONS),
    snils: base.snils,
    inn: makeInn(rng),
    passportSeries: pad(1000 + Math.floor(rng() * 9000), 4),
    passportNumber: pad(Math.floor(rng() * 1000000), 6),
    passportIssuedBy: `ГУ МВД России по ${base.region}`,
    passportIssuedAt: randomDate(rng, 2005, 2024),
    passportCode: `${pad(Math.floor(rng() * 1000), 3)}-${pad(Math.floor(rng() * 1000), 3)}`,
    phone,
    phoneAlt: chance(rng, 0.4) ? makePhone(rng) : '',
    email,
    telegram: chance(rng, 0.3) ? '@' + translit(base.firstName) + Math.floor(rng() * 99) : '',
    regAddress: reg,
    factAddress: fact,
    sameAddress,
    bloodType: pick(rng, ['I (0)+', 'I (0)-', 'II (A)+', 'II (A)-', 'III (B)+', 'III (B)-', 'IV (AB)+', 'IV (AB)-']),
    omsPolicy: pad(Math.floor(rng() * 1e16), 16),
    disabilityGroup: related.benefits.some((benefit) => benefit.title === 'Инвалидность')
      ? pick(rng, ['I', 'II', 'III'])
      : 'нет',
    militaryStatus: base.gender === 'male'
      ? pick(rng, ['военнообязанный', 'снят с учета', 'невоеннообязанный', 'в запасе'])
      : 'невоеннообязанная',
    militaryOffice: base.gender === 'male' ? `Военкомат ${base.city}` : '',
    militaryRank: base.gender === 'male' && chance(rng, 0.35)
      ? pick(rng, ['рядовой', 'сержант', 'лейтенант', 'капитан'])
      : '',
    workplace: currentJob?.employer ?? '',
    position: currentJob?.position ?? '',
    department: pick(rng, ['-', 'Отдел продаж', 'Бухгалтерия', 'IT', 'Кадры']),
    income: Math.round((20000 + rng() * 180000) / 1000) * 1000,
    socialStatus: pick(rng, ['нет', 'льготник', 'ветеран', 'многодетный']),
    notes: chance(rng, 0.2) ? 'Требуется актуализация контактных данных.' : '',
    status: base.status,
    registeredAt: randomDate(rng, 2015, 2024),
    updatedAt: randomDate(rng, 2023, 2025),
    ...related,
  }
}
