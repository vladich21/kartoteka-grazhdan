import { DateField, Fields, TextField } from '../../../components/FormFields'
import type { Citizen } from '../../../types'

export function DocsTab({
  person,
  patch,
}: {
  person: Citizen
  patch: (next: Partial<Citizen>) => void
}) {
  return (
    <div>
      <Fields>
        <TextField label="СНИЛС" value={person.snils} onChange={(snils) => patch({ snils })} />
        <TextField label="ИНН" value={person.inn} onChange={(inn) => patch({ inn })} />
        <TextField label="Серия паспорта" value={person.passportSeries} onChange={(passportSeries) => patch({ passportSeries })} />
        <TextField label="Номер паспорта" value={person.passportNumber} onChange={(passportNumber) => patch({ passportNumber })} />
        <TextField label="Код подразделения" value={person.passportCode} onChange={(passportCode) => patch({ passportCode })} />
        <DateField label="Дата выдачи" value={person.passportIssuedAt} onChange={(passportIssuedAt) => patch({ passportIssuedAt })} />
        <TextField label="Кем выдан" value={person.passportIssuedBy} onChange={(passportIssuedBy) => patch({ passportIssuedBy })} span={24} />
      </Fields>
    </div>
  )
}
