import { Fields, TextField } from '../../../components/FormFields'
import type { Citizen } from '../../../types'

export function MilitaryTab({
  person,
  patch,
}: {
  person: Citizen
  patch: (next: Partial<Citizen>) => void
}) {
  return (
    <Fields>
      <TextField label="Статус" value={person.militaryStatus} onChange={(militaryStatus) => patch({ militaryStatus })} />
      <TextField label="Звание" value={person.militaryRank} onChange={(militaryRank) => patch({ militaryRank })} />
      <TextField label="Военкомат" value={person.militaryOffice} onChange={(militaryOffice) => patch({ militaryOffice })} />
    </Fields>
  )
}
