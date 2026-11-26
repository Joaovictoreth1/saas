import assert from 'node:assert/strict'
import { test } from 'node:test'
import { estimate, plans, seatLimit } from './pricing.js'

test('quotes the selected plan for the selected seat count', () => {
  assert.deepEqual(estimate(plans[1], '3', false), { seats: 3, monthly: 14700, invoice: 14700, savings: 0 })
})

test('annual billing applies the discount and reports full annual savings', () => {
  assert.deepEqual(estimate(plans[0], '5', true), { seats: 5, monthly: 11600, invoice: 139200, savings: 34800 })
})

test('rejects incomplete, fractional, exponential and out-of-range seat counts', () => {
  for (const value of ['', ' ', '0', '-1', '1.5', '1e2', String(seatLimit + 1)]) {
    assert.equal(estimate(plans[0], value, true), null)
  }
  assert.equal(estimate(plans[0], String(seatLimit), true).seats, seatLimit)
})
