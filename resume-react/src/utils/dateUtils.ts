/**
 * Auto-calculation utilities for portfolio data.
 * These ensure Age and Experience always reflect the current date.
 */

/** Calculate current age from DOB (Sep 6, 2000) */
export const calculateAge = (): number => {
  const dob = new Date('2000-09-06')
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
  return age
}

/**
 * Total professional experience (from BOTSIO internship, Mar 2023).
 * This is the earliest professional engagement on the resume.
 */
export const calculateTotalExperience = (): { years: number; months: number; label: string } => {
  const start = new Date('2023-03-01')
  const today = new Date()
  const totalMonths =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth())
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  // e.g. "3+ yrs" or "2.5+ yrs"
  const label = months >= 6 ? `${years}.5+ yrs` : `${years}+ yrs`
  return { years, months, label }
}

/**
 * TCS tenure (from Dec 2023 — Present).
 * Used to display current role duration.
 */
export const calculateTCSTenure = (): { years: number; months: number; label: string } => {
  const start = new Date('2023-12-01')
  const today = new Date()
  const totalMonths =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth())
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years}y`)
  if (months > 0) parts.push(`${months}m`)
  return { years, months, label: parts.join(' ') || '< 1m' }
}

/** Format a past date as "Month Year" string */
export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
