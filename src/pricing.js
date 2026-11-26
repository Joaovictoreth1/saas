export const seatLimit = 200
export const plans = [
  { id: 'starter', name: 'Essencial', monthly: 2900, description: 'Projetos compartilhados e calendário da equipe.' },
  { id: 'team', name: 'Equipe', monthly: 4900, description: 'Inclui permissões por projeto e relatórios.' },
  { id: 'business', name: 'Negócios', monthly: 7900, description: 'Inclui histórico de auditoria e suporte prioritário.' },
]

export function estimate(plan, rawSeats, annual) {
  if (!/^\d+$/.test(rawSeats)) return null
  const seats = Number(rawSeats)
  if (!Number.isSafeInteger(seats) || seats < 1 || seats > seatLimit) return null

  const baseMonthly = seats * plan.monthly
  const monthly = annual ? Math.round(baseMonthly * 80 / 100) : baseMonthly
  return {
    seats,
    monthly,
    invoice: annual ? monthly * 12 : monthly,
    savings: (baseMonthly - monthly) * 12,
  }
}
