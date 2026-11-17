export function makeRng(seed: number) {
  let state = seed >>> 0

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

export function pick<T>(rng: () => number, list: T[]) {
  return list[Math.floor(rng() * list.length)]
}

export function chance(rng: () => number, probability: number) {
  return rng() < probability
}

export function pad(value: number, length: number) {
  return String(value).padStart(length, '0')
}

export function formatDate(year: number, month: number, day: number) {
  return `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`
}

export function randomDate(rng: () => number, fromYear: number, toYear: number) {
  const year = fromYear + Math.floor(rng() * (toYear - fromYear + 1))
  const month = 1 + Math.floor(rng() * 12)
  const day = 1 + Math.floor(rng() * 28)
  return formatDate(year, month, day)
}
