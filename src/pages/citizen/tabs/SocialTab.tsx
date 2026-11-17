import { SimpleTable, orText } from '../../../components/SimpleTable'
import type { Citizen } from '../../../types'

export function SocialTab({ person }: { person: Citizen }) {
  return (
    <div>
      <h4>Льготы</h4>
      <SimpleTable
        rows={person.benefits}
        columns={[
          { title: 'Название', dataIndex: 'title' },
          { title: 'Категория', dataIndex: 'category' },
          { title: 'С', dataIndex: 'assignedAt' },
          { title: 'До', dataIndex: 'validUntil', render: (value: string | null) => orText(value, 'бессрочно') },
        ]}
      />

      <h4>Медучет</h4>
      <SimpleTable
        rows={person.medicalRecords}
        columns={[
          { title: 'Диагноз', dataIndex: 'diagnosis' },
          { title: 'Дата', dataIndex: 'date' },
          { title: 'Клиника', dataIndex: 'clinic' },
        ]}
      />

      <h4>Страховки</h4>
      <SimpleTable
        rows={person.insurancePolicies}
        columns={[
          { title: 'Тип', dataIndex: 'insuranceType' },
          { title: 'Номер', dataIndex: 'number' },
          { title: 'До', dataIndex: 'validUntil' },
        ]}
      />

      <h4>Соц. статусы</h4>
      <SimpleTable
        rows={person.socialStatuses}
        columns={[
          { title: 'Статус', dataIndex: 'title' },
          { title: 'С', dataIndex: 'dateFrom' },
          { title: 'По', dataIndex: 'dateTo' },
        ]}
      />
    </div>
  )
}
