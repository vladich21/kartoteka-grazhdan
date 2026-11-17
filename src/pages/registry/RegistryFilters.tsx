import { Button, Checkbox, Input, Select, Space } from 'antd'
import { REGIONS } from '../../data/dictionaries'
import { STATUS_LABEL } from '../../data/params'

export type RegistryFilterValues = {
  search: string
  region: string
  status: string
  gender: string
  onlyBenefits: boolean
}

export function RegistryFilters(props: {
  values: RegistryFilterValues
  onChange: (next: Partial<RegistryFilterValues>) => void
  onReset: () => void
}) {
  const values = props.values

  return (
    <Space wrap size={[8, 8]}>
      <Input
        style={{ width: 260 }}
        placeholder="ФИО, СНИЛС, город..."
        value={values.search}
        allowClear
        onChange={(event) => props.onChange({ search: event.target.value })}
      />

      <Select
        style={{ width: 220 }}
        placeholder="Регион"
        allowClear
        value={values.region || undefined}
        onChange={(region) => props.onChange({ region: region || '' })}
        options={REGIONS.map((item) => ({
          value: item.name,
          label: item.name,
        }))}
      />

      <Select
        style={{ width: 160 }}
        placeholder="Статус"
        allowClear
        value={values.status || undefined}
        onChange={(status) => props.onChange({ status: status || '' })}
        options={Object.keys(STATUS_LABEL).map((key) => ({
          value: key,
          label: STATUS_LABEL[key],
        }))}
      />

      <Select
        style={{ width: 140 }}
        placeholder="Пол"
        allowClear
        value={values.gender || undefined}
        onChange={(gender) => props.onChange({ gender: gender || '' })}
        options={[
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' },
        ]}
      />

      <Checkbox
        checked={values.onlyBenefits}
        onChange={(event) => props.onChange({ onlyBenefits: event.target.checked })}
      >
        Только с льготами
      </Checkbox>

      <Button onClick={props.onReset}>Сбросить</Button>
    </Space>
  )
}
