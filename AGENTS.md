# Repository rules

## Project
Implement cartTotal(items, options) according to README.md.
src/cart.js contains the implementation.
test/cart.test.js contains behaviour tests.

## Stack
Plain JavaScript, Node.js, ES Modules.
Use node:test and node:assert/strict.
No external dependencies or devDependencies.

## Allowed changes
- src/cart.js
- test/cart.test.js
- package.json
- AGENTS.md
- scripts/
- .github/workflows/ci.yml
- ASSISTANT_BRIEF.md
- AI-LOG.md
- SELF_ASSESSMENT_REPORT.md

Limit changes to the files listed above. A task brief may narrow this scope further.
For work outside the applicable scope, report the blocker, reason and proposed
change without modifying other files.

## Commands
- npm test: run behaviour tests.
- npm run format:check: check JavaScript formatting.
- npm run check: run format check and tests.
- git diff --check: check whitespace in the diff.

The format check covers JavaScript files in src/, test/ and scripts/.
It rejects trailing whitespace, tab indentation and missing final newlines.
Both LF and CRLF line endings are accepted.

## Behaviour
Keep the named export and function signature.
Calculate VAT on subtotal.
Free shipping applies when subtotal >= freeShipFrom.
Empty carts return 0 without VAT or shipping.
Negative prices and quantities that are not positive integers throw RangeError.
Round only the final total and return a number.

## Review
Read every changed file and every diff.
Preserve the original worked-example test.
Derive expected results from the specification.
Before accepting completed functional changes, npm run check must pass.
The initial starter test is expected to fail before implementation.

## NEVER
NEVER introduce external dependencies.
NEVER change expected outputs to justify an incorrect implementation.
NEVER swallow required RangeError exceptions.
NEVER create a second cartTotal implementation.
NEVER write tests that pass without checking actual behaviour.
NEVER claim a test or CI run passed without observing it.
