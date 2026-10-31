const money = new Intl.NumberFormat('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const clock = new Intl.DateTimeFormat('uk-UA', { hour: '2-digit', minute: '2-digit' })

export const formatMoney = (value: number) => money.format(value)
export const formatTime = (ts: number) => clock.format(ts)

/** Ukrainian plural form: `pluralUk(5, ['товар', 'товари', 'товарів'])` → `товарів`. */
export function pluralUk(n: number, [one, few, many]: readonly [string, string, string]) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

/** Lower-cases and unifies apostrophes so «м'ясо» matches «м’ясо». */
export const normalizeText = (text: string) => text.toLowerCase().replace(/[’ʼ`]/g, "'")
