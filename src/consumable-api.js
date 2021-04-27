let id = 4;

let consumables = [
  {
    id: 0,
    type: "nicotine",
    vg: 50,
    pg: 50,
    strength: 18,
    amount: 10,
  },
  {
    id: 1,
    type: "flavor",
    flavorType: "PG",
    name: "Melon",
    amount: 10,
  },
  {
    id: 2,
    type: "pg",
    amount: 1000,
  },
  {
    id: 3,
    type: "vg",
    amount: 1000,
  },
];

function getConsumables() {
  return Promise.resolve(consumables);
}

function getConsumablesByType(type) {
  return Promise.resolve(consumables.filter((c) => c.type === type));
}

function createConsumable(consumable) {
  consumables = [...consumables, { ...consumable, id }];
  id++;
  return Promise.resolve({ ...consumable, id });
}

function editConsumable(consumable) {
  consumables = consumables.map((c) =>
    c.id === consumable.id ? consumable : c
  );
  return Promise.resolve({ ...consumable, id });
}

const Service = {
  getConsumables,
  getConsumablesByType,
  createConsumable,
  editConsumable,
};

export default Service;