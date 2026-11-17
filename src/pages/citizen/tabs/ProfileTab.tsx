import { useRef, useState } from 'react'
import {
  DateField,
  Fields,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
  labelOptions,
  useEditing,
} from '../../../components/FormFields'
import { GENDER_LABEL, MARITAL_LABEL, STATUS_LABEL } from '../../../data/params'
import type { Citizen } from '../../../types'

export function ProfileTab({
  person,
  patch,
}: {
  person: Citizen
  patch: (next: Partial<Citizen>) => void
}) {
  const editing = useEditing()
  const fileInput = useRef<HTMLInputElement>(null)
  const [photoUrl, setPhotoUrl] = useState('')

  function uploadPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setPhotoUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return URL.createObjectURL(file)
    })
  }

  function removePhoto() {
    setPhotoUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return ''
    })
  }

  return (
    <div>
      <div className="profile-layout">
        <div className="profile-fields">
          <h4>Общая информация</h4>
          <Fields>
            <TextField label="Фамилия" value={person.lastName} onChange={(lastName) => patch({ lastName })} />
            <TextField label="Имя" value={person.firstName} onChange={(firstName) => patch({ firstName })} />
            <TextField label="Отчество" value={person.middleName} onChange={(middleName) => patch({ middleName })} />
            <DateField label="Дата рождения" value={person.birthDate} onChange={(birthDate) => patch({ birthDate })} />
            <SelectField
              label="Пол"
              value={person.gender}
              onChange={(gender) => patch({ gender })}
              options={labelOptions<Citizen['gender']>(GENDER_LABEL)}
            />
            <SelectField
              label="Семейное положение"
              value={person.maritalStatus}
              onChange={(maritalStatus) => patch({ maritalStatus })}
              options={labelOptions<Citizen['maritalStatus']>(MARITAL_LABEL)}
            />
            <TextField label="Гражданство" value={person.citizenship} onChange={(citizenship) => patch({ citizenship })} />
            <TextField label="Национальность" value={person.nationality} onChange={(nationality) => patch({ nationality })} />
            <TextField label="Профессия" value={person.profession} onChange={(profession) => patch({ profession })} />
            <TextField label="Подразделение" value={person.department} onChange={(department) => patch({ department })} />
            <NumberField label="Доход" value={person.income} onChange={(income) => patch({ income })} money />
            <TextField label="Группа крови" value={person.bloodType} onChange={(bloodType) => patch({ bloodType })} />
            <TextField label="Полис ОМС" value={person.omsPolicy} onChange={(omsPolicy) => patch({ omsPolicy })} />
            <TextField label="Инвалидность" value={person.disabilityGroup} onChange={(disabilityGroup) => patch({ disabilityGroup })} />
            <SelectField
              label="Статус записи"
              value={person.status}
              onChange={(status) => patch({ status })}
              options={labelOptions<Citizen['status']>(STATUS_LABEL)}
            />
            <TextField label="Место рождения" value={person.birthPlace} onChange={(birthPlace) => patch({ birthPlace })} span={24} />
            <TextAreaField label="Примечание" value={person.notes} onChange={(notes) => patch({ notes })} />
          </Fields>
        </div>

        <div className="profile-photo">
          <h4>Фото</h4>
          <div className="preview-photo">
            {photoUrl
              ? <img src={photoUrl} alt="" />
              : <span>{person.lastName[0]}{person.firstName[0]}</span>}
            {editing ? (
              <div className="photo-actions">
                <button type="button" onClick={() => fileInput.current?.click()}>Загрузить</button>
                <button type="button" onClick={removePhoto}>Удалить</button>
              </div>
            ) : null}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={uploadPhoto}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
