import { test } from "node:test";
import assert from "node:assert/strict";
import { cartTotal } from "../src/cart.js";

// This test fails until you implement cartTotal. That is the point:
// run `npm test` first and see it red.
test("the example from the slides", () => {
  const items = [
    { name: "Áo thun", price: 180000, qty: 2 },
    { name: "Sổ tay", price: 45000, qty: 1 },
  ];
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };
  assert.equal(cartTotal(items, options), 467400);
});

test("empty cart returns 0", () => {
  const options = {
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
  };

  assert.equal(cartTotal([], options), 0);
});

function singleItem(price, qty = 1) {
  return [{ name: "Test item", price, qty }];
}

function cartOptions(overrides = {}) {
  return {
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
    ...overrides,
  };
}

test("returns a number", () => {
  const result = cartTotal(singleItem(100000), cartOptions());

  assert.equal(typeof result, "number");
});

test("subtotal includes every item and its quantity", () => {
  const items = [
    { name: "A", price: 100, qty: 2 },
    { name: "B", price: 50, qty: 3 },
  ];
  const options = cartOptions({ vatRate: 0, shipFee: 0 });

  assert.equal(cartTotal(items, options), 350);
});

test("applies the configured VAT rate to subtotal", () => {
  const options = cartOptions({ vatRate: 0.1, shipFee: 0 });

  assert.equal(cartTotal(singleItem(100000), options), 110000);
});

// Disable VAT so each boundary test focuses on the shipping rule.
const shippingCases = [
  {
    name: "charges shipping just below the threshold",
    price: 499999,
    expected: 529999,
  },
  {
    name: "shipping is free exactly at the threshold",
    price: 500000,
    expected: 500000,
  },
  {
    name: "shipping is free above the threshold",
    price: 500001,
    expected: 500001,
  },
];

for (const { name, price, expected } of shippingCases) {
  test(name, () => {
    assert.equal(
      cartTotal(singleItem(price), cartOptions({ vatRate: 0 })),
      expected,
    );
  });
}

test("does not apply VAT to the shipping fee", () => {
  assert.equal(cartTotal(singleItem(100000), cartOptions()), 138000);
});

test("checks free shipping against subtotal before VAT", () => {
  // Subtotal is 480000; after VAT it exceeds 500000 but shipping still applies.
  assert.equal(cartTotal(singleItem(480000), cartOptions()), 548400);
});

test("checks the shipping threshold before rounding subtotal", () => {
  const options = cartOptions({ vatRate: 0 });

  assert.equal(cartTotal(singleItem(499999.6), options), 530000);
});

test("a nonempty cart with a zero-priced item still pays shipping", () => {
  assert.equal(cartTotal(singleItem(0), cartOptions()), 30000);
});

test("rounds the final total down below half a dong", () => {
  const options = cartOptions({ vatRate: 0, shipFee: 0 });

  assert.equal(cartTotal(singleItem(100.4), options), 100);
});

test("rounds the final total up at half a dong", () => {
  const options = cartOptions({ vatRate: 0, shipFee: 0 });

  assert.equal(cartTotal(singleItem(100.5), options), 101);
});

test("rounds after summing items rather than rounding each item", () => {
  const items = [
    { name: "A", price: 100.4, qty: 1 },
    { name: "B", price: 100.4, qty: 1 },
  ];
  const options = cartOptions({ vatRate: 0, shipFee: 0 });

  assert.equal(cartTotal(items, options), 201);
});

test("includes fractional VAT before rounding the final total", () => {
  const options = cartOptions({ vatRate: 0.001, shipFee: 0 });

  // Subtotal 100.4 plus VAT 0.1004 rounds to 101.
  assert.equal(cartTotal(singleItem(100.4), options), 101);
});

test("negative price throws RangeError", () => {
  assert.throws(() => cartTotal(singleItem(-1), cartOptions()), RangeError);
});

const invalidQuantities = [
  { name: "zero quantity throws RangeError", qty: 0 },
  { name: "negative quantity throws RangeError", qty: -1 },
  { name: "fractional quantity throws RangeError", qty: 1.5 },
];

for (const { name, qty } of invalidQuantities) {
  test(name, () => {
    assert.throws(
      () => cartTotal(singleItem(100000, qty), cartOptions()),
      RangeError,
    );
  });
}

test("rejects a negative price after a valid item", () => {
  const items = [
    { name: "Valid", price: 100000, qty: 1 },
    { name: "Invalid", price: -1, qty: 1 },
  ];

  assert.throws(() => cartTotal(items, cartOptions()), RangeError);
});

test("rejects an invalid quantity after a valid item", () => {
  const items = [
    { name: "Valid", price: 100000, qty: 1 },
    { name: "Invalid", price: 100000, qty: 1.5 },
  ];

  assert.throws(() => cartTotal(items, cartOptions()), RangeError);
});
