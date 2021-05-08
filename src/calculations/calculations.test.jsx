import { calculateAmounts, calculatePercents } from "./index";

test("calculatePercents", () => {
  const received = calculatePercents({
    vg: 70,
    pg: 30,
    nicotineStrength: 6,
    nicotine: {
      strength: 18,
      vg: 70,
      pg: 30,
    },
    flavors: [{ flavor: { flavorType: "PG" }, percent: 10 }],
  });
  expect(received.nicotinePercent).toBeCloseTo(0.3333);
  expect(received.vgPercent).toBeCloseTo(0.4666);
  expect(received.pgPercent).toBeCloseTo(0.0999);
});

test("calculateAmounts 100ml", () => {
  const received = calculateAmounts(
    {
      amount: 100,
      flavors: [{ flavor: { flavorType: "PG" }, percent: 10 }],
    },
    { nicotinePercent: 0.3333, vgPercent: 0.4666, pgPercent: 0.0999 }
  );
  expect(received.nicotineAmount).toBeCloseTo(33.33, 1);
  expect(received.vgAmount).toBeCloseTo(46.66, 1);
  expect(received.pgAmount).toBeCloseTo(9.99, 1);
});

test("calculateAmounts 60ml", () => {
  const received = calculateAmounts(
    {
      amount: 60,
      flavors: [{ flavor: { flavorType: "PG" }, percent: 10 }],
    },
    { nicotinePercent: 0.3333, vgPercent: 0.4666, pgPercent: 0.0999 }
  );
  expect(received.nicotineAmount).toBeCloseTo(20, 1);
  expect(received.vgAmount).toBeCloseTo(28, 1);
  expect(received.pgAmount).toBeCloseTo(6, 1);
});
