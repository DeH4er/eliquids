export function calculate(recipe) {
  const percents = calculatePercents(recipe);
  const amounts = calculateAmounts(recipe, percents);

  return [
    {
      name: `Nicotine ${recipe.nicotine.strength}mg`,
      amount: amounts.nicotineAmount,
      percent: percents.nicotinePercent * 100,
    },
    {
      name: `PG`,
      amount: amounts.pgAmount,
      percent: percents.pgPercent * 100,
    },
    {
      name: `VG`,
      amount: amounts.vgAmount,
      percent: percents.vgPercent * 100,
    },
    ...recipe.flavors.map((f, i) => {
      return {
        name: f.flavor.name,
        amount: amounts.flavors[i],
        percent: f.percent,
      };
    }),
  ];
}

export function calculatePercents({
  vg,
  pg,
  nicotineStrength: desiredNicotineStrength,
  nicotine,
  flavors,
}) {
  const nicotineVG = nicotine.vg;
  const nicotinePG = nicotine.pg;
  const nicotineStrength = nicotine.strength;

  const nicotinePercent = desiredNicotineStrength / nicotineStrength;
  const nicotineVGPercent = (nicotineVG / 100) * nicotinePercent;
  const nicotinePGPercent = (nicotinePG / 100) * nicotinePercent;
  const flavorsVGPercent = flavors
    .filter((f) => f.flavor.flavorType === "VG")
    .map((f) => f.percent / 100)
    .reduce((acc, v) => acc + v, 0);
  const flavorsPGPercent = flavors
    .filter((f) => f.flavor.flavorType === "PG")
    .map((f) => f.percent / 100)
    .reduce((acc, v) => acc + v, 0);
  const vgPercent = vg / 100 - flavorsVGPercent - nicotineVGPercent;
  const pgPercent = pg / 100 - flavorsPGPercent - nicotinePGPercent;

  return {
    vgPercent,
    pgPercent,
    nicotinePercent,
  };
}

export function calculateAmounts(recipe, percents) {
  return {
    vgAmount: recipe.amount * percents.vgPercent,
    pgAmount: recipe.amount * percents.pgPercent,
    nicotineAmount: recipe.amount * percents.nicotinePercent,
    flavors: recipe.flavors.map((f) => recipe.amount * (f.percent / 100)),
  };
}
