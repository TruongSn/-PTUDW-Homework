# Assistant brief — cartTotal

## Task and sources

Implement the named export `cartTotal(items, options)` in `src/cart.js`.
Read `README.md` and `AGENTS.md` before changing code.
This brief covers the functional implementation and its tests; harness and
submission documents are separate tasks.

## Scope

For this implementation task, edit only:

- `src/cart.js`
- `test/cart.test.js`

Keep the named export, function signature, existing test runner and original
worked-example test. Do not modify other files as part of this task.
If a change outside this scope appears necessary, report the blocker, reason
and proposed change without making that change.

## Contract and business rules

Inputs:

- `items`: an array of `{ name, price, qty }` objects.
- `options`: `{ vatRate, freeShipFrom, shipFee }`.

Required behaviour:

- `subtotal` is the sum of `price * qty` for every item.
- VAT is `subtotal * vatRate`; shipping is not taxed.
- Shipping is `0` when `subtotal >= freeShipFrom`, otherwise `shipFee`.
- Determine free shipping from subtotal before VAT and rounding.
- Return `subtotal + VAT + shipping`, rounded once at the end to the whole đồng.
- The result must be a JavaScript `number`, not a string.
- An empty cart returns `0`, without VAT or shipping.
- A negative `price` throws `RangeError`.
- A `qty` that is not a positive integer throws `RangeError`, including `0`,
  negative values and fractional values. Do not coerce or round quantities.
- Do not introduce unspecified default options or extra business rules.

## Worked example

```javascript
const items = [
  { name: 'Áo thun', price: 180000, qty: 2 },
  { name: 'Sổ tay', price: 45000, qty: 1 },
]
const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
```

Expected result: `467400`, with type `number`.

Calculation: subtotal `405000`, VAT `32400`, shipping `30000` because subtotal
is below `500000`; total `405000 + 32400 + 30000 = 467400`.

## Constraints and review

- Use plain JavaScript and the existing ES Modules structure.
- NEVER introduce dependencies or devDependencies. Use `node:test` and
  `node:assert/strict` for tests.
- NEVER swallow required exceptions or replace invalid-input errors with `0`.
- NEVER create a second implementation or hardcode the worked-example result.
- NEVER alter expected outputs to justify an incorrect implementation.
- Check that every API used exists and is appropriate for the current stack.
- Keep the implementation simple enough for the student to explain every line.

## Testing and acceptance

Preserve the original example test and add independent behaviour tests for:

- Return type and empty carts.
- Subtotals below, exactly at and above the free-shipping threshold.
- A subtotal below the threshold whose value after VAT exceeds the threshold.
- VAT calculated on subtotal only.
- Negative prices and quantities equal to `0`, negative or fractional.
- Invalid items appearing after valid items.
- Final rounding, including rounding up and down.

Tests must call the real function, derive expected values from the specification
and assert `RangeError` specifically for invalid inputs. Each test should have
a clear purpose and be capable of detecting incorrect behaviour.

Run:

- `npm test`
- `npm run format:check`
- `npm run check` (format check followed by tests)
- `git diff --check`

Read every diff and read newly created files directly when they are not yet
tracked. Accept completed functional changes only when both gates pass.
Report actual commands, results and unresolved issues. Do not claim unobserved
test or CI success.

After each task, record AI assistance while it is fresh. 
Do not edit AI-LOG.md as part of this implementation task.
Never fabricate student edits, rejected suggestions,
manual contributions, or verification results.

Distinguish what the
brief ruled out from what was caught during review; do not invent student edits,
rejections or work written by hand.
