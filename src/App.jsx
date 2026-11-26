import { useState } from 'react'
import { estimate, plans, seatLimit } from './pricing.js'
import './App.css'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const price = cents => money.format(cents / 100)

export default function App() {
  const [seats, setSeats] = useState('5')
  const [annual, setAnnual] = useState(false)
  const [selected, setSelected] = useState(plans[0])
  const quote = estimate(selected, seats, annual)

  return (
    <main className="pricing">
      <header>
        <p className="eyebrow">SaaS · Simulador</p>
        <h1>Planeje o custo da sua equipe</h1>
        <p>Compare os planos com preços ilustrativos. Nenhuma cobrança será feita.</p>
      </header>
      <section aria-labelledby="team-title" className="panel">
        <h2 id="team-title">Configure sua estimativa</h2>
        <div className="preferences">
          <div>
            <label htmlFor="seats">Pessoas na equipe</label>
            <input id="seats" type="number" min="1" max={seatLimit} step="1" value={seats}
              aria-invalid={!quote} aria-describedby="seat-hint"
              onChange={event => setSeats(event.currentTarget.value)} />
            <p id="seat-hint">Informe um número inteiro entre 1 e {seatLimit}.</p>
          </div>
          <label className="billing">
            <input type="checkbox" checked={annual} onChange={event => setAnnual(event.currentTarget.checked)} />
            Cobrança anual com 20% de desconto
          </label>
        </div>
      </section>
      <fieldset className="plans">
        <legend>Selecione um plano</legend>
        <div className="plan-grid">
          {plans.map(plan => (
            <label key={plan.id} className="panel plan">
              <span className="plan-title">
                <input type="radio" name="plan" checked={selected === plan} onChange={() => setSelected(plan)} />
                {plan.name}
              </span>
              <span>{plan.description}</span>
              <span><strong>{price(plan.monthly)}</strong> por pessoa/mês, sem desconto</span>
            </label>
          ))}
        </div>
      </fieldset>
      <section className="panel summary" aria-labelledby="quote-title">
        <h2 id="quote-title">Estimativa · {selected.name}</h2>
        <div aria-live="polite" aria-atomic="true">
          {quote ? (
            <dl>
              <div><dt>Equipe</dt><dd>{quote.seats} {quote.seats === 1 ? 'pessoa' : 'pessoas'}</dd></div>
              <div><dt>{annual ? 'Cobrança anual' : 'Cobrança mensal'}</dt><dd>{price(quote.invoice)}</dd></div>
              {annual && <>
                <div><dt>Equivalente por mês</dt><dd>{price(quote.monthly)}</dd></div>
                <div><dt>Economia em 12 meses</dt><dd>{price(quote.savings)}</dd></div>
              </>}
            </dl>
          ) : <p>Informe uma quantidade válida para calcular o total.</p>}
        </div>
      </section>
    </main>
  )
}
