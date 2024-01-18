export function formatRelativeTime(utcTimeString: string): string {
  const utcDateTime: Date = new Date(utcTimeString)
  const currentTime: Date = new Date()
  const timeDifference: number = currentTime.getTime() - utcDateTime.getTime()

  const seconds: number = Math.floor(timeDifference / 1000)
  const minutes: number = Math.floor(seconds / 60)
  const hours: number = Math.floor(minutes / 60)
  const days: number = Math.floor(hours / 24)
  const months: number = Math.floor(days / 30)
  const year: number = Math.floor(months / 12)

  if (year > 0) {
    return `${year} year${year > 1 ? 's' : ''} ago`
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
  }
}
