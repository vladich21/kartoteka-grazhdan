import { useEffect, useState } from 'react'
import { App } from 'antd'
import { loadCitizen, saveCitizen } from '../data/citizenEdits'
import type { AddressBlock, Citizen } from '../types'

function empty(value: string) {
  return value.trim() === ''
}

function missingRequired(person: Citizen) {
  const missing: string[] = []
  if (empty(person.lastName)) missing.push('Фамилия')
  if (empty(person.firstName)) missing.push('Имя')
  if (empty(person.birthDate)) missing.push('Дата рождения')
  if (empty(person.citizenship)) missing.push('Гражданство')
  if (empty(person.snils)) missing.push('СНИЛС')
  if (empty(person.passportSeries)) missing.push('Серия паспорта')
  if (empty(person.passportNumber)) missing.push('Номер паспорта')
  if (empty(person.passportIssuedBy)) missing.push('Кем выдан')
  if (empty(person.passportIssuedAt)) missing.push('Дата выдачи')
  if (empty(person.passportCode)) missing.push('Код подразделения')
  if (empty(person.phone)) missing.push('Телефон')
  if (empty(person.regAddress.region)) missing.push('Регион регистрации')
  if (empty(person.regAddress.city)) missing.push('Город регистрации')
  if (empty(person.regAddress.street)) missing.push('Улица регистрации')
  if (empty(person.regAddress.house)) missing.push('Дом регистрации')
  if (empty(person.factAddress.region)) missing.push('Регион проживания')
  if (empty(person.factAddress.city)) missing.push('Город проживания')
  if (empty(person.factAddress.street)) missing.push('Улица проживания')
  if (empty(person.factAddress.house)) missing.push('Дом проживания')
  return missing
}

function todayIso() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return now.getFullYear() + '-' + month + '-' + day
}

export function useCitizenForm(citizenId: number) {
  const { message } = App.useApp()
  const [person, setPerson] = useState<Citizen | null>(() => loadCitizen(citizenId))
  const [editing, setEditing] = useState(false)
  const [beforeEdit, setBeforeEdit] = useState<Citizen | null>(null)

  useEffect(() => {
    setPerson(loadCitizen(citizenId))
    setEditing(false)
    setBeforeEdit(null)
  }, [citizenId])

  function patch(next: Partial<Citizen>) {
    if (!person) return
    setPerson({ ...person, ...next })
  }

  function patchAddress(kind: 'regAddress' | 'factAddress', next: Partial<AddressBlock>) {
    if (!person) return
    setPerson({
      ...person,
      [kind]: { ...person[kind], ...next },
    })
  }

  function updateAttribute(key: string, value: string) {
    if (!person) return

    const attributes = person.attributes.map((attr) => {
      if (attr.key !== key) return attr
      return { ...attr, value }
    })

    setPerson({ ...person, attributes })
  }

  function startEdit() {
    if (!person) return
    setBeforeEdit(person)
    setEditing(true)
  }

  function cancelEdit() {
    if (beforeEdit) setPerson(beforeEdit)
    setBeforeEdit(null)
    setEditing(false)
  }

  function save() {
    if (!person) return
    const missing = missingRequired(person)
    if (missing.length > 0) {
      message.error('Заполните обязательные поля: ' + missing.join(', '))
      return
    }
    const next = { ...person, updatedAt: todayIso() }
    saveCitizen(next)
    setPerson(next)
    setBeforeEdit(null)
    setEditing(false)
    message.success('Сохранено')
  }

  return {
    person,
    editing,
    patch,
    patchAddress,
    updateAttribute,
    startEdit,
    cancelEdit,
    save,
  }
}
