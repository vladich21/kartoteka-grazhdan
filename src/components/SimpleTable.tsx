import { Table, type TableColumnsType } from 'antd'

export function SimpleTable<Row extends { id: string }>(props: {
  rows: Row[]
  columns: TableColumnsType<Row>
}) {
  return (
    <Table
      size="small"
      rowKey="id"
      pagination={false}
      style={{ marginBottom: 16 }}
      dataSource={props.rows}
      columns={props.columns}
      locale={{ emptyText: 'Нет записей' }}
      scroll={{ x: true }}
    />
  )
}

export function yesNo(value: boolean) {
  return value ? 'да' : 'нет'
}

export function orText(value: string | number | null | undefined, fallback = '—') {
  return value || fallback
}
