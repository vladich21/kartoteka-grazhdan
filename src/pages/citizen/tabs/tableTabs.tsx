import { SimpleTable, orText, yesNo } from '../../../components/SimpleTable'
import { StatusBadge } from '../../../components/StatusBadge'
import { EDUCATION_LABEL, RELATION_LABEL } from '../../../data/params'
import type { Citizen } from '../../../types'

export function FamilyTab({ person }: { person: Citizen }) {
  return (
    <SimpleTable
      rows={person.family}
      columns={[
        { title: 'ФИО', dataIndex: 'fullName' },
        { title: 'Родство', dataIndex: 'relation', render: (value) => RELATION_LABEL[value] || value },
        { title: 'Дата рождения', dataIndex: 'birthDate' },
        { title: 'Живет вместе', dataIndex: 'livingTogether', render: yesNo },
      ]}
    />
  )
}

export function EducationTab({ person }: { person: Citizen }) {
  return (
    <SimpleTable
      rows={person.education}
      columns={[
        { title: 'Уровень', dataIndex: 'level', render: (value) => EDUCATION_LABEL[value] || value },
        { title: 'Учреждение', dataIndex: 'institution' },
        { title: 'Специальность', dataIndex: 'specialty' },
        { title: 'С', dataIndex: 'yearFrom' },
        { title: 'По', dataIndex: 'yearTo', render: (value) => orText(value, 'н.в.') },
        { title: 'Диплом', dataIndex: 'diplomaNumber' },
      ]}
    />
  )
}

export function WorkTab({ person }: { person: Citizen }) {
  return (
    <SimpleTable
      rows={person.jobs}
      columns={[
        { title: 'Работодатель', dataIndex: 'employer' },
        { title: 'Должность', dataIndex: 'position' },
        { title: 'С', dataIndex: 'dateFrom' },
        { title: 'По', dataIndex: 'dateTo', render: (value) => orText(value, 'н.в.') },
        { title: 'Текущее', dataIndex: 'isCurrent', render: yesNo },
      ]}
    />
  )
}

export function FinanceTab({ person }: { person: Citizen }) {
  return (
    <div>
      <h4>Счета</h4>
      <SimpleTable
        rows={person.bankAccounts}
        columns={[
          { title: 'Банк', dataIndex: 'bank' },
          { title: 'Счет', dataIndex: 'account' },
          { title: 'Валюта', dataIndex: 'currency' },
        ]}
      />
      <h4>Налоги</h4>
      <SimpleTable
        rows={person.taxPayments}
        columns={[
          { title: 'Период', dataIndex: 'period' },
          { title: 'Сумма', dataIndex: 'amount' },
          { title: 'Статус', dataIndex: 'taxStatus' },
        ]}
      />
    </div>
  )
}

export function AppealsTab({ person }: { person: Citizen }) {
  return (
    <SimpleTable
      rows={person.appeals}
      columns={[
        { title: 'Номер', dataIndex: 'number' },
        { title: 'Тема', dataIndex: 'topic' },
        { title: 'Источник', dataIndex: 'source' },
        { title: 'Статус', dataIndex: 'status', render: (status) => <StatusBadge status={status} /> },
        { title: 'Дата', dataIndex: 'createdAt' },
      ]}
    />
  )
}

export function AssetsTab({ person }: { person: Citizen }) {
  return (
    <div>
      <h4>Транспорт</h4>
      <SimpleTable
        rows={person.vehicles}
        columns={[
          { title: 'Марка', dataIndex: 'brand' },
          { title: 'Модель', dataIndex: 'model' },
          { title: 'Номер', dataIndex: 'plate' },
          { title: 'Год', dataIndex: 'year' },
        ]}
      />
      <h4>Недвижимость</h4>
      <SimpleTable
        rows={person.properties}
        columns={[
          { title: 'Тип', dataIndex: 'propertyType' },
          { title: 'Адрес', dataIndex: 'address' },
          { title: 'Площадь', dataIndex: 'area' },
        ]}
      />
      <h4>История адресов</h4>
      <SimpleTable
        rows={person.addressHistory}
        columns={[
          { title: 'Адрес', dataIndex: 'address' },
          { title: 'С', dataIndex: 'dateFrom' },
          { title: 'По', dataIndex: 'dateTo' },
        ]}
      />
    </div>
  )
}

export function OtherTab({ person }: { person: Citizen }) {
  return (
    <div>
      <h4>Документы гражданства</h4>
      <SimpleTable
        rows={person.citizenshipDocs}
        columns={[
          { title: 'Тип', dataIndex: 'docType' },
          { title: 'Номер', dataIndex: 'number' },
          { title: 'Дата', dataIndex: 'date' },
        ]}
      />
      <h4>Правонарушения</h4>
      <SimpleTable
        rows={person.violations}
        columns={[
          { title: 'Статья', dataIndex: 'article' },
          { title: 'Дата', dataIndex: 'date' },
          { title: 'Санкция', dataIndex: 'sanction' },
        ]}
      />
      <h4>Вложения</h4>
      <SimpleTable
        rows={person.attachments}
        columns={[
          { title: 'Файл', dataIndex: 'fileName' },
          { title: 'Тип', dataIndex: 'fileType' },
          { title: 'Загружен', dataIndex: 'uploadedAt' },
        ]}
      />
      <h4>История изменений</h4>
      <SimpleTable
        rows={person.changeLog}
        columns={[
          { title: 'Поле', dataIndex: 'field' },
          { title: 'Было', dataIndex: 'oldValue' },
          { title: 'Стало', dataIndex: 'newValue' },
          { title: 'Кто', dataIndex: 'changedBy' },
          { title: 'Когда', dataIndex: 'changedAt' },
        ]}
      />
    </div>
  )
}
