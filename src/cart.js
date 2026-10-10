// Calculate the final cart total according to README.md.
export function cartTotal(items, options) {
  if (items.length === 0) {
    return 0
  }

  let subtotal = 0

  for (const { price, qty } of items) {
    if (price < 0) {
      throw new RangeError('price must be non-negative')
    }

    if (!Number.isInteger(qty) || qty <= 0) {
      throw new RangeError('qty must be a positive integer')
    }

    subtotal += price * qty
  }

  const vat = subtotal * options.vatRate
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee

  return Math.round(subtotal + vat + shipping)
}
