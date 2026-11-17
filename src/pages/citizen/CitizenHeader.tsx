import { Button, Card, Space } from 'antd'
import { ageFromBirth, fullName } from '../../data/generate'
import type { Citizen } from '../../types'

export function CitizenHeader({
  person,
  editing,
  onEdit,
  onCancel,
  onSave,
}: {
  person: Citizen
  editing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
}) {

  return (
    <Card style={{ marginBottom: 16 }}>
      <Space style={{ width: '100%', justifyContent: 'space-between' }} align="start" wrap>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{fullName(person)}</div>
          <Space size={12} wrap className="muted">
            <span>ID {person.id}</span>
            <span>{ageFromBirth(person.birthDate)} лет</span>
          </Space>
        </div>
        <Space>
          {editing ? (
            <>
              <Button onClick={onCancel}>Отменить</Button>
              <Button type="primary" onClick={onSave}>Сохранить</Button>
            </>
          ) : (
            <Button type="primary" onClick={onEdit}>Редактировать</Button>
          )}
        </Space>
      </Space>
    </Card>
  )
}
