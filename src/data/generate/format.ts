export function translit(word: string) {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  }

  return word
    .toLowerCase()
    .split('')
    .map((letter) => map[letter] || letter)
    .join('')
}

export function fullName(person: { lastName: string; firstName: string; middleName: string }) {
  return `${person.lastName} ${person.firstName} ${person.middleName}`
}

export function ageFromBirth(birthDate: string, now = new Date()) {
  const parts = birthDate.split('-').map(Number)
  const year = parts[0]
  const birthMonth = parts[1]
  const birthDay = parts[2]

  let age = now.getFullYear() - year
  const month = now.getMonth() + 1

  if (month < birthMonth || (month === birthMonth && now.getDate() < birthDay)) {
    age -= 1
  }

  return age
}

export function formatRuDate(isoDate: string) {
  const parts = isoDate.split('-')
  return `${parts[2]}.${parts[1]}.${parts[0]}`
}
