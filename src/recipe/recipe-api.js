let id = 3;
let recipes = [
  {
    id: "0",
    name: "Sweet melon",
    amount: 100,
    pg: 30,
    vg: 70,
    nicotineStrength: 2,
    nicotine: {
      vg: 50,
      pg: 50,
      strength: 18,
      amount: 10,
    },
    flavors: [
      { flavor: { id: 1, name: "Melon", flavorType: "PG" }, percent: 15 },
      { flavor: { id: 4, name: "Donut", flavorType: "VG" }, percent: 3 },
    ],
  },
  {
    id: "1",
    name: "Lemon cake",
    amount: 100,
    pg: 30,
    vg: 70,
    nicotineStrength: 2,
    flavors: [{ flavor: { id: 1, name: "Donut" }, percent: 5 }],
  },
  {
    id: "2",
    name: "Pure donut",
    amount: 100,
    pg: 30,
    vg: 70,
    nicotineStrength: 2,
    flavors: [{ flavor: { id: 4, name: "Donut" }, percent: 15 }],
  },
  {
    id: "3",
    name: "Pure donut",
    amount: 100,
    pg: 30,
    vg: 70,
    nicotineStrength: 2,
    flavors: [{ flavor: { id: 1, name: "Donut" }, percent: 15 }],
  },
  {
    id: "4",
    name: "Pure donut",
    amount: 100,
    pg: 30,
    vg: 70,
    nicotineStrength: 2,
    flavors: [{ flavor: { id: 1, name: "Donut" }, percent: 15 }],
  },
  {
    id: "5",
    name: "Pure donut",
    amount: 100,
    pg: 30,
    vg: 70,
    nicotineStrength: 2,
    flavors: [{ flavor: { id: 1, name: "Donut" }, percent: 15 }],
  },
  {
    id: "6",
    name: "Pure donut",
    amount: 100,
    pg: 30,
    vg: 70,
    nicotineStrength: 2,
    flavors: [{ flavor: { id: 1, name: "Donut" }, percent: 15 }],
  },
];

export function getRecipes() {
  return Promise.resolve(recipes);
}

export function getRecipe(id) {
  return Promise.resolve(recipes.find((recipe) => recipe.id === id));
}

export function createRecipe(recipe) {
  const newRecipe = { ...recipe, id: id.toString() };
  recipes = [...recipes, newRecipe];
  id++;
  return Promise.resolve(newRecipe);
}

export function updateRecipe(recipe) {
  recipes = recipes.map((r) => (r.id === recipe.id ? recipe : r));
  return Promise.resolve(recipe);
}

const Service = {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
};

export default Service;
