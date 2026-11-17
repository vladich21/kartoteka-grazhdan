import { REGIONS } from '../../data/dictionaries'
import { Fields, SelectField, TextField } from '../../components/FormFields'
import type { AddressBlock } from '../../types'

export function AddressFields(props: {
  address: AddressBlock
  onChange: (next: Partial<AddressBlock>) => void
}) {
  const address = props.address

  return (
    <Fields>
      <SelectField
        label="Регион"
        value={address.region}
        onChange={(region) => props.onChange({ region })}
        options={REGIONS.map((region) => ({
          value: region.name,
          label: region.name,
        }))}
      />
      <TextField label="Город" value={address.city} onChange={(city) => props.onChange({ city })} />
      <TextField label="Улица" value={address.street} onChange={(street) => props.onChange({ street })} />
      <TextField label="Дом" value={address.house} onChange={(house) => props.onChange({ house })} />
      <TextField label="Квартира" value={address.apartment} onChange={(apartment) => props.onChange({ apartment })} />
      <TextField label="Индекс" value={address.postalCode} onChange={(postalCode) => props.onChange({ postalCode })} />
    </Fields>
  )
}
