export function monthYearFomatter(inputDate: string): string {
  const date = new Date(inputDate)
  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short'}
  return date.toLocaleDateString('en-US', options)
}
