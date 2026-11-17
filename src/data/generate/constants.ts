import type { CitizenStatus } from '../../types'

export const TOTAL_CITIZENS = 100_000

export const STATUS_WEIGHTS: { status: CitizenStatus; weight: number }[] = [
  { status: 'active', weight: 0.78 },
  { status: 'temporary', weight: 0.1 },
  { status: 'archived', weight: 0.08 },
  { status: 'deceased', weight: 0.04 },
]
