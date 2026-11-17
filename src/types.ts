export type Gender = 'male' | 'female'
export type CitizenStatus = 'active' | 'temporary' | 'archived' | 'deceased'
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'

export type FamilyRelation =
  | 'spouse'
  | 'child'
  | 'parent'
  | 'sibling'
  | 'guardian'

export type EducationLevel =
  | 'none'
  | 'school'
  | 'college'
  | 'bachelor'
  | 'master'
  | 'phd'

export interface FamilyMember {
  id: string
  fullName: string
  relation: FamilyRelation
  birthDate: string
  livingTogether: boolean
}

export interface EducationRecord {
  id: string
  level: EducationLevel
  institution: string
  specialty: string
  yearFrom: number
  yearTo: number | null
  diplomaNumber: string
}

export interface JobRecord {
  id: string
  employer: string
  position: string
  dateFrom: string
  dateTo: string | null
  isCurrent: boolean
}

export interface Benefit {
  id: string
  title: string
  category: string
  assignedAt: string
  validUntil: string | null
}

export interface Appeal {
  id: string
  number: string
  topic: string
  source: string
  status: 'new' | 'in_progress' | 'done' | 'rejected'
  createdAt: string
}

export interface DocItem {
  id: string
  docType: string
  series: string
  number: string
  issuedAt: string
  validUntil: string
}

export interface PhoneItem {
  id: string
  number: string
  phoneType: string
  isMain: boolean
}

export interface EmailItem {
  id: string
  email: string
  emailType: string
  confirmed: boolean
}

export interface VehicleItem {
  id: string
  brand: string
  model: string
  plate: string
  year: number
}

export interface PropertyItem {
  id: string
  propertyType: string
  address: string
  area: number
}

export interface MedicalItem {
  id: string
  diagnosis: string
  date: string
  clinic: string
}

export interface InsuranceItem {
  id: string
  insuranceType: string
  number: string
  validUntil: string
}

export interface BankItem {
  id: string
  bank: string
  account: string
  currency: string
}

export interface TaxItem {
  id: string
  period: string
  amount: number
  taxStatus: string
}

export interface AddressHistoryItem {
  id: string
  address: string
  dateFrom: string
  dateTo: string
}

export interface CitizenshipDocItem {
  id: string
  docType: string
  number: string
  date: string
}

export interface SocialStatusItem {
  id: string
  title: string
  dateFrom: string
  dateTo: string
}

export interface ViolationItem {
  id: string
  article: string
  date: string
  sanction: string
}

export interface AttachmentItem {
  id: string
  fileName: string
  fileType: string
  uploadedAt: string
}

export interface ChangeLogItem {
  id: string
  field: string
  oldValue: string
  newValue: string
  changedBy: string
  changedAt: string
}

export interface ExtraAttribute {
  key: string
  title: string
  value: string
}

export interface AddressBlock {
  region: string
  city: string
  street: string
  house: string
  apartment: string
  postalCode: string
}

export interface CitizenListItem {
  id: number
  lastName: string
  firstName: string
  middleName: string
  birthDate: string
  gender: Gender
  snils: string
  region: string
  city: string
  status: CitizenStatus
  hasBenefits: boolean
}

export interface Citizen {
  id: number
  lastName: string
  firstName: string
  middleName: string
  birthDate: string
  gender: Gender
  citizenship: string
  birthPlace: string
  maritalStatus: MaritalStatus
  nationality: string
  profession: string
  snils: string
  inn: string
  passportSeries: string
  passportNumber: string
  passportIssuedBy: string
  passportIssuedAt: string
  passportCode: string
  phone: string
  phoneAlt: string
  email: string
  telegram: string
  regAddress: AddressBlock
  factAddress: AddressBlock
  sameAddress: boolean
  bloodType: string
  omsPolicy: string
  disabilityGroup: string
  militaryStatus: string
  militaryOffice: string
  militaryRank: string
  workplace: string
  position: string
  department: string
  income: number
  socialStatus: string
  notes: string
  status: CitizenStatus
  registeredAt: string
  updatedAt: string
  family: FamilyMember[]
  education: EducationRecord[]
  jobs: JobRecord[]
  benefits: Benefit[]
  appeals: Appeal[]
  documents: DocItem[]
  phones: PhoneItem[]
  emails: EmailItem[]
  vehicles: VehicleItem[]
  properties: PropertyItem[]
  medicalRecords: MedicalItem[]
  insurancePolicies: InsuranceItem[]
  bankAccounts: BankItem[]
  taxPayments: TaxItem[]
  addressHistory: AddressHistoryItem[]
  citizenshipDocs: CitizenshipDocItem[]
  socialStatuses: SocialStatusItem[]
  violations: ViolationItem[]
  attachments: AttachmentItem[]
  changeLog: ChangeLogItem[]
  attributes: ExtraAttribute[]
}

export interface AccountParam {
  key: string
  title: string
  group: string
  type: string
  required: boolean
  description: string
}
