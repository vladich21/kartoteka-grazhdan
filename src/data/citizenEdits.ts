import type { Citizen } from '../types'
import { getCitizen } from './generate'

const edits = new Map<number, Citizen>()

export function loadCitizen(id: number) {
  const edited = edits.get(id)
  if (edited) return edited
  return getCitizen(id)
}

export function saveCitizen(person: Citizen) {
  edits.set(person.id, person)
}

export function dropCitizenEdit(id: number) {
  edits.delete(id)
}
