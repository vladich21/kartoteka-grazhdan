import { Input, Table } from 'antd'
import { useEditing } from '../../../components/FormFields'
import type { Citizen, ExtraAttribute } from '../../../types'

export function ExtraTab({
  person,
  updateAttribute,
}: {
  person: Citizen
  updateAttribute: (key: string, value: string) => void
}) {
  const editing = useEditing()

  return (
    <Table
      size="small"
      rowKey="key"
      pagination={{ pageSize: 20 }}
      dataSource={person.attributes}
      columns={[
        { title: 'Ключ', dataIndex: 'key', width: 180 },
        { title: 'Параметр', dataIndex: 'title' },
        {
          title: 'Значение',
          dataIndex: 'value',
          render: (value: string, row: ExtraAttribute) => {
            if (!editing) return value || '—'
            return (
              <Input
                value={value}
                onChange={(event) => updateAttribute(row.key, event.target.value)}
              />
            )
          },
        },
      ]}
    />
  )
}
