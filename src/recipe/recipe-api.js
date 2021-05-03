let id = 3;
let recipes = [
  {
    id: 0,
    name: "Sweet melon",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [
      { flavor: { id: 0, name: "Melon" }, percent: 15 },
      { flavor: { id: 1, name: "Donut" }, percent: 3 },
    ],
  },
  {
    id: 1,
    name: "Lemon cake",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [
      { flavor: { id: 0, name: "Lemon Cake" }, percent: 6 },
      { flavor: { id: 1, name: "Melon" }, percent: 4 },
      { flavor: { id: 2, name: "Donut" }, percent: 5 },
    ],
  },
  {
    id: 2,
    name: "Pure donut",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [{ flavor: { id: 0, name: "Donut" }, percent: 15 }],
  },
  {
    id: 3,
    name: "Pure donut",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [{ flavor: { id: 0, name: "Donut" }, percent: 15 }],
  },
  {
    id: 4,
    name: "Pure donut",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [{ flavor: { id: 0, name: "Donut" }, percent: 15 }],
  },
  {
    id: 5,
    name: "Pure donut",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [{ flavor: { id: 0, name: "Donut" }, percent: 15 }],
  },
  {
    id: 6,
    name: "Pure donut",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [{ flavor: { id: 0, name: "Donut" }, percent: 15 }],
  },
];

export function getRecipes() {
  return Promise.resolve(recipes);
}

export function getRecipe(id) {
  return Promise.resolve(recipes.find((recipe) => recipe.id === id));
}

export function createRecipe(recipe) {
  const newRecipe = { ...recipe, id };
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
