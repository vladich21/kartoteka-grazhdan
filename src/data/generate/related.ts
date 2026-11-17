import type { Appeal, Benefit, EducationRecord, FamilyMember, Gender, JobRecord } from '../../types'
import { ACCOUNT_PARAMS } from '../params'
import {
  APPEAL_SOURCES,
  APPEAL_TOPICS,
  BENEFIT_TITLES,
  EMPLOYERS,
  INSTITUTIONS,
  POSITIONS,
  SPECIALTIES,
  STREETS,
} from '../dictionaries'
import { chance, formatDate, pad, pick, randomDate } from '../rng'
import { buildName, makePhone, randomGender } from './person'

function personName(rng: () => number, gender: Gender) {
  const person = buildName(rng, gender)
  return `${person.lastName} ${person.firstName} ${person.middleName}`
}

export function makeFamily(rng: () => number, gender: Gender): FamilyMember[] {
  const list: FamilyMember[] = []

  if (chance(rng, 0.55)) {
    const spouseGender: Gender = gender === 'male' ? 'female' : 'male'
    list.push({
      id: 'f-spouse',
      fullName: personName(rng, spouseGender),
      relation: 'spouse',
      birthDate: randomDate(rng, 1965, 1998),
      livingTogether: chance(rng, 0.85),
    })
  }

  const kids = Math.floor(rng() * 4)
  for (let index = 0; index < kids; index++) {
    list.push({
      id: `f-child-${index}`,
      fullName: personName(rng, randomGender(rng)),
      relation: 'child',
      birthDate: randomDate(rng, 2005, 2023),
      livingTogether: chance(rng, 0.7),
    })
  }

  if (chance(rng, 0.35)) {
    list.push({
      id: 'f-parent',
      fullName: personName(rng, randomGender(rng)),
      relation: 'parent',
      birthDate: randomDate(rng, 1945, 1970),
      livingTogether: chance(rng, 0.2),
    })
  }

  return list
}

export function makeEducation(rng: () => number): EducationRecord[] {
  const count = 1 + Math.floor(rng() * 3)
  const levels = ['school', 'college', 'bachelor', 'master', 'phd'] as const
  const records: EducationRecord[] = []

  for (let index = 0; index < count; index++) {
    const yearFrom = 1995 + Math.floor(rng() * 25)
    const done = chance(rng, 0.85)
    records.push({
      id: `edu-${index}`,
      level: levels[Math.min(index, levels.length - 1)],
      institution: pick(rng, INSTITUTIONS),
      specialty: pick(rng, SPECIALTIES),
      yearFrom,
      yearTo: done ? yearFrom + 2 + Math.floor(rng() * 4) : null,
      diplomaNumber: done ? `${pad(Math.floor(rng() * 100000), 5)}-${pad(Math.floor(rng() * 10000), 4)}` : '',
    })
  }

  return records
}

export function makeJobs(rng: () => number): JobRecord[] {
  const count = Math.floor(rng() * 4)
  const jobs: JobRecord[] = []
  let year = 2005 + Math.floor(rng() * 10)

  for (let index = 0; index < count; index++) {
    const isCurrent = index === count - 1 && chance(rng, 0.7)
    const dateFrom = formatDate(year, 1 + Math.floor(rng() * 12), 1 + Math.floor(rng() * 28))
    const toYear = year + 1 + Math.floor(rng() * 4)

    jobs.push({
      id: `job-${index}`,
      employer: pick(rng, EMPLOYERS),
      position: pick(rng, POSITIONS),
      dateFrom,
      dateTo: isCurrent ? null : formatDate(toYear, 1 + Math.floor(rng() * 12), 1 + Math.floor(rng() * 28)),
      isCurrent,
    })

    year = toYear
  }

  return jobs
}

export function makeBenefits(rng: () => number): Benefit[] {
  if (!chance(rng, 0.28)) return []

  const count = 1 + Math.floor(rng() * 3)
  const used = new Set<number>()
  const benefits: Benefit[] = []

  for (let index = 0; index < count; index++) {
    let titleIndex = Math.floor(rng() * BENEFIT_TITLES.length)
    while (used.has(titleIndex)) titleIndex = Math.floor(rng() * BENEFIT_TITLES.length)
    used.add(titleIndex)

    const benefit = BENEFIT_TITLES[titleIndex]
    benefits.push({
      id: `ben-${index}`,
      title: benefit.title,
      category: benefit.category,
      assignedAt: randomDate(rng, 2018, 2025),
      validUntil: chance(rng, 0.6) ? randomDate(rng, 2026, 2028) : null,
    })
  }

  return benefits
}

export function makeAppeals(rng: () => number): Appeal[] {
  const count = Math.floor(rng() * 5)
  const statuses = ['new', 'in_progress', 'done', 'rejected'] as const
  const appeals: Appeal[] = []

  for (let index = 0; index < count; index++) {
    appeals.push({
      id: `ap-${index}`,
      number: `ОБР-${2020 + Math.floor(rng() * 6)}-${pad(Math.floor(rng() * 99999), 5)}`,
      topic: pick(rng, APPEAL_TOPICS),
      source: pick(rng, APPEAL_SOURCES),
      status: pick(rng, [...statuses]),
      createdAt: randomDate(rng, 2021, 2025),
    })
  }

  return appeals
}

export function makeDocuments(rng: () => number) {
  const count = 1 + Math.floor(rng() * 3)
  const types = ['Паспорт', 'СНИЛС', 'ИНН', 'Свидетельство', 'Водительские права']
  const list = []

  for (let index = 0; index < count; index++) {
    list.push({
      id: 'doc-' + index,
      docType: pick(rng, types),
      series: pad(Math.floor(rng() * 10000), 4),
      number: pad(Math.floor(rng() * 1000000), 6),
      issuedAt: randomDate(rng, 2008, 2024),
      validUntil: randomDate(rng, 2026, 2035),
    })
  }

  return list
}

export function makePhones(rng: () => number, mainPhone: string) {
  const list = [{ id: 'ph-0', number: mainPhone, phoneType: 'мобильный', isMain: true }]

  if (chance(rng, 0.4)) {
    list.push({ id: 'ph-1', number: makePhone(rng), phoneType: 'домашний', isMain: false })
  }

  return list
}

export function makeEmails(rng: () => number, mainEmail: string) {
  return [{ id: 'em-0', email: mainEmail, emailType: 'личный', confirmed: chance(rng, 0.7) }]
}

function oneOrNone<Row>(rng: () => number, probability: number, row: Row) {
  if (!chance(rng, probability)) return []
  return [row]
}

export function makeVehicles(rng: () => number) {
  return oneOrNone(rng, 0.35, {
    id: 'vh-0',
    brand: pick(rng, ['Lada', 'Hyundai', 'Kia', 'Toyota', 'Volkswagen']),
    model: pick(rng, ['Vesta', 'Rio', 'Solaris', 'Camry', 'Polo']),
    plate: 'А' + pad(Math.floor(rng() * 1000), 3) + 'ВС' + pad(77 + Math.floor(rng() * 20), 2),
    year: 2008 + Math.floor(rng() * 16),
  })
}

export function makeProperties(rng: () => number) {
  return oneOrNone(rng, 0.4, {
    id: 'pr-0',
    propertyType: pick(rng, ['квартира', 'комната', 'дом', 'участок']),
    address: pick(rng, STREETS) + ', д. ' + (1 + Math.floor(rng() * 80)),
    area: 20 + Math.floor(rng() * 80),
  })
}

export function makeMedical(rng: () => number) {
  return oneOrNone(rng, 0.3, {
    id: 'med-0',
    diagnosis: pick(rng, ['ОРВИ', 'Гипертония', 'Гастрит', 'Здоров']),
    date: randomDate(rng, 2020, 2025),
    clinic: 'Поликлиника №' + (1 + Math.floor(rng() * 40)),
  })
}

export function makeInsurance(rng: () => number) {
  return [{
    id: 'ins-0',
    insuranceType: pick(rng, ['ОМС', 'ДМС', 'ОСАГО']),
    number: pad(Math.floor(rng() * 1e10), 10),
    validUntil: randomDate(rng, 2026, 2028),
  }]
}

export function makeBanks(rng: () => number) {
  return oneOrNone(rng, 0.5, {
    id: 'bank-0',
    bank: pick(rng, ['Сбер', 'ВТБ', 'Газпромбанк', 'Тинькофф']),
    account: '40817' + pad(Math.floor(rng() * 1e15), 15),
    currency: 'RUB',
  })
}

export function makeTaxes(rng: () => number) {
  return oneOrNone(rng, 0.4, {
    id: 'tax-0',
    period: '2024',
    amount: 1000 + Math.floor(rng() * 50000),
    taxStatus: pick(rng, ['оплачен', 'начислен', 'просрочен']),
  })
}

export function makeAddressHistory(rng: () => number) {
  const count = 1 + Math.floor(rng() * 2)
  const list = []

  for (let index = 0; index < count; index++) {
    list.push({
      id: 'ah-' + index,
      address: pick(rng, STREETS) + ', д. ' + (1 + Math.floor(rng() * 100)),
      dateFrom: randomDate(rng, 2005, 2018),
      dateTo: randomDate(rng, 2019, 2024),
    })
  }

  return list
}

export function makeCitizenshipDocs(rng: () => number) {
  return [{
    id: 'cd-0',
    docType: pick(rng, ['паспорт РФ', 'свидетельство', 'вкладыш']),
    number: pad(Math.floor(rng() * 1e8), 8),
    date: randomDate(rng, 2000, 2020),
  }]
}

export function makeSocialStatuses(rng: () => number) {
  return oneOrNone(rng, 0.25, {
    id: 'ss-0',
    title: pick(rng, ['многодетная семья', 'ветеран труда', 'инвалид', 'малоимущий']),
    dateFrom: randomDate(rng, 2015, 2022),
    dateTo: '',
  })
}

export function makeViolations(rng: () => number) {
  return oneOrNone(rng, 0.15, {
    id: 'vl-0',
    article: pick(rng, ['КоАП 12.9', 'КоАП 20.1', 'КоАП 6.24']),
    date: randomDate(rng, 2018, 2024),
    sanction: pick(rng, ['штраф', 'предупреждение']),
  })
}

export function makeAttachments(rng: () => number) {
  return oneOrNone(rng, 0.4, {
    id: 'att-0',
    fileName: pick(rng, ['passport.pdf', 'snils.jpg', 'statement.pdf']),
    fileType: 'document',
    uploadedAt: randomDate(rng, 2022, 2025),
  })
}

export function makeChangeLog(rng: () => number) {
  return [{
    id: 'cl-0',
    field: 'phone',
    oldValue: makePhone(rng),
    newValue: makePhone(rng),
    changedBy: 'ФИО оператора',
    changedAt: randomDate(rng, 2023, 2025),
  }]
}

export function makeAttributes(rng: () => number) {
  const skip: Record<string, boolean> = {
    lastName: true,
    firstName: true,
    middleName: true,
    birthDate: true,
    gender: true,
    citizenship: true,
    birthPlace: true,
    maritalStatus: true,
    snils: true,
    inn: true,
    passportSeries: true,
    passportNumber: true,
    passportIssuedBy: true,
    passportIssuedAt: true,
    passportCode: true,
    phone: true,
    phoneAlt: true,
    email: true,
    bloodType: true,
    omsPolicy: true,
    disabilityGroup: true,
    militaryStatus: true,
    militaryOffice: true,
    militaryRank: true,
    workplace: true,
    position: true,
    income: true,
    status: true,
    registeredAt: true,
    updatedAt: true,
    notes: true,
    nationality: true,
    profession: true,
    telegram: true,
    department: true,
    socialStatus: true,
  }

  const list = []

  for (let index = 0; index < ACCOUNT_PARAMS.length; index++) {
    const param = ACCOUNT_PARAMS[index]
    if (param.type === 'таблица') continue
    if (skip[param.key]) continue

    let value = ''
    if (param.type === 'число') value = String(Math.floor(rng() * 100))
    else if (param.type === 'дата') value = randomDate(rng, 2010, 2025)
    else if (param.type === 'список') value = pick(rng, ['да', 'нет', 'не указано'])
    else value = pick(rng, ['н/д', 'уточняется', 'заполнено', '-'])

    list.push({ key: param.key, title: param.title, value })
  }

  return list
}

export function buildRelated(rng: () => number, gender: Gender, hasBenefits: boolean, phone: string, email: string) {
  const jobs = makeJobs(rng)
  const benefits = hasBenefits ? makeBenefits(rng) : []

  if (hasBenefits && benefits.length === 0) {
    benefits.push({
      id: 'ben-0',
      title: BENEFIT_TITLES[0].title,
      category: BENEFIT_TITLES[0].category,
      assignedAt: randomDate(rng, 2019, 2024),
      validUntil: null,
    })
  }

  return {
    jobs,
    benefits,
    family: makeFamily(rng, gender),
    education: makeEducation(rng),
    appeals: makeAppeals(rng),
    documents: makeDocuments(rng),
    phones: makePhones(rng, phone),
    emails: makeEmails(rng, email),
    vehicles: makeVehicles(rng),
    properties: makeProperties(rng),
    medicalRecords: makeMedical(rng),
    insurancePolicies: makeInsurance(rng),
    bankAccounts: makeBanks(rng),
    taxPayments: makeTaxes(rng),
    addressHistory: makeAddressHistory(rng),
    citizenshipDocs: makeCitizenshipDocs(rng),
    socialStatuses: makeSocialStatuses(rng),
    violations: makeViolations(rng),
    attachments: makeAttachments(rng),
    changeLog: makeChangeLog(rng),
    attributes: makeAttributes(rng),
  }
}
