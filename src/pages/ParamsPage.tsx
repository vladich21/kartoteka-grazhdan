import { Card, Table } from 'antd'
import { ACCOUNT_PARAMS } from '../data/params'

export function ParamsPage() {
  const groups: { name: string; rows: typeof ACCOUNT_PARAMS }[] = []

  for (let index = 0; index < ACCOUNT_PARAMS.length; index++) {
    const param = ACCOUNT_PARAMS[index]
    let group = null

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      if (groups[groupIndex].name === param.group) {
        group = groups[groupIndex]
        break
      }
    }

    if (group) {
      group.rows.push(param)
    } else {
      groups.push({
        name: param.group,
        rows: [param],
      })
    }
  }

  const columns = [
    { title: 'Параметр', dataIndex: 'title' },
    { title: 'Тип', dataIndex: 'type', width: 120 },
    {
      title: 'Обязательный',
      dataIndex: 'required',
      width: 120,
      render: (required: boolean) => {
        if (required === true) return 'да'
        return 'нет'
      },
    },
    { title: 'Описание', dataIndex: 'description' },
  ]

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0, marginBottom: 0 }}>
          Параметры учета{' '}
          <span className="muted">({ACCOUNT_PARAMS.length})</span>
        </h3>
      </Card>

      {groups.map((group) => (
        <Card
          key={group.name}
          title={
            <span>
              {group.name}{' '}
              <span className="muted">({group.rows.length})</span>
            </span>
          }
          style={{ marginBottom: 16 }}
        >
          <Table
            size="small"
            rowKey="key"
            pagination={false}
            dataSource={group.rows}
            columns={columns}
            scroll={{ x: 700 }}
          />
        </Card>
      ))}
    </div>
  )
}
