import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Spin, Table } from 'antd'
import { filterPeople } from '../data/filterPeople'
import { formatRuDate, fullName } from '../data/generate'
import { StatusBadge } from '../components/StatusBadge'
import { useCitizenIndex } from '../hooks/useCitizenIndex'
import { RegistryFilters, type RegistryFilterValues } from './registry/RegistryFilters'

const PAGE_SIZE = 40
const EMPTY_FILTERS: RegistryFilterValues = {
  search: '',
  region: '',
  status: '',
  gender: '',
  onlyBenefits: false,
}

const tableColumns = [
  { title: 'ID', dataIndex: 'id', width: 70 },
  {
    title: 'ФИО',
    render: (_: unknown, person: { lastName: string; firstName: string; middleName: string }) => fullName(person),
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birthDate',
    width: 140,
    render: (birthDate: string) => formatRuDate(birthDate),
  },
  { title: 'Регион', dataIndex: 'region' },
  { title: 'СНИЛС', dataIndex: 'snils', width: 160 },
  {
    title: 'Статус',
    dataIndex: 'status',
    width: 130,
    render: (status: string) => <StatusBadge status={status} />,
  },
]

export function RegistryPage() {
  const people = useCitizenIndex()
  const navigate = useNavigate()
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [page, setPage] = useState(1)

  const matched = useMemo(() => {
    if (!people) return []
    return filterPeople(people, filters)
  }, [people, filters])

  if (!people) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" />
        <div style={{ marginTop: 12 }}>Загрузка...</div>
      </div>
    )
  }

  const total = matched.length
  const start = (page - 1) * PAGE_SIZE
  const pageRows = matched.slice(start, start + PAGE_SIZE)

  function changeFilters(next: Partial<RegistryFilterValues>) {
    setFilters({ ...filters, ...next })
    setPage(1)
  }

  function resetFilters() {
    setFilters(EMPTY_FILTERS)
    setPage(1)
  }

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <RegistryFilters
          values={filters}
          onChange={changeFilters}
          onReset={resetFilters}
        />
      </Card>

      <Card title={`Список граждан (${total.toLocaleString('ru-RU')})`}>
        <Table
          size="small"
          rowKey="id"
          dataSource={pageRows}
          columns={tableColumns}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total,
            showSizeChanger: false,
            onChange: setPage,
          }}
          onRow={(person) => ({
            onClick: () => navigate('/citizens/' + person.id),
            style: { cursor: 'pointer' },
          })}
        />
      </Card>
    </div>
  )
}
