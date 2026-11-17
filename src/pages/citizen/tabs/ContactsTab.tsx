import { Fields, TextField, useEditing } from '../../../components/FormFields'
import type { AddressBlock, Citizen } from '../../../types'
import { AddressFields } from '../AddressFields'

function sameAddress(left: AddressBlock, right: AddressBlock) {
  return left.region === right.region
    && left.city === right.city
    && left.street === right.street
    && left.house === right.house
    && left.apartment === right.apartment
    && left.postalCode === right.postalCode
}

export function ContactsTab({
  person,
  patch,
  patchAddress,
}: {
  person: Citizen
  patch: (next: Partial<Citizen>) => void
  patchAddress: (kind: 'regAddress' | 'factAddress', next: Partial<AddressBlock>) => void
}) {
  const editing = useEditing()
  const addressesMatch = sameAddress(person.regAddress, person.factAddress)

  return (
    <div>
      <Fields>
        <TextField label="Телефон" value={person.phone} onChange={(phone) => patch({ phone })} />
        <TextField label="Доп. телефон" value={person.phoneAlt} onChange={(phoneAlt) => patch({ phoneAlt })} />
        <TextField label="E-mail" value={person.email} onChange={(email) => patch({ email })} />
        <TextField label="Telegram" value={person.telegram} onChange={(telegram) => patch({ telegram })} />
      </Fields>

      <h4>Адрес регистрации</h4>
      <AddressFields
        address={person.regAddress}
        onChange={(next) => patchAddress('regAddress', next)}
      />

      <h4 style={{ marginTop: 16 }}>Адрес проживания</h4>
      {addressesMatch && !editing ? (
        <div className="muted">Совпадает с адресом регистрации</div>
      ) : (
        <AddressFields
          address={person.factAddress}
          onChange={(next) => patchAddress('factAddress', next)}
        />
      )}
    </div>
  )
}
