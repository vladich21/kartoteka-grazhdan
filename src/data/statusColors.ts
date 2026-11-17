import type { CitizenStatus } from '../types'

const citizenStatusColor: Record<CitizenStatus, string> = {
  active: '#0f766e',
  temporary: '#f59e0b',
  archived: '#64748b',
  deceased: '#dc2626',
}

const appealStatusColor: Record<string, string> = {
  new: '#2563eb',
  in_progress: '#d97706',
  done: '#15803d',
  rejected: '#dc2626',
}

const statusPalette: Record<string, string> = {
  ...citizenStatusColor,
  ...appealStatusColor,
}

export function statusColor(status: string) {
  return statusPalette[status] || '#64748b'
}
