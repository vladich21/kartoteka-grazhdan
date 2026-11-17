import { useEffect, useState } from 'react'
import { App } from 'antd'
import { loadCitizen, saveCitizen } from '../data/citizenEdits'
import type { AddressBlock, Citizen } from '../types'

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
