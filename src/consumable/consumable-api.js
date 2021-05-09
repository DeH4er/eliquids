let id = 5;

let consumables = [
  {
    id: "0",
    type: "nicotine",
    vg: 50,
    pg: 50,
    strength: 18,
    amount: 10,
  },
  {
    id: "1",
    type: "flavor",
    flavorType: "PG",
    name: "Melon",
    amount: 10,
  },
  {
    id: "2",
    type: "pg",
    amount: 1000,
  },
  {
    id: "3",
    type: "vg",
    amount: 1000,
  },
  {
    id: "4",
    type: "flavor",
    flavorType: "PG",
    name: "Lemon Cake",
    amount: 10,
  },
];

function getConsumables() {
  return Promise.resolve(consumables);
}

function getConsumablesByType(type) {
  return Promise.resolve(consumables.filter((c) => c.type === type));
}

function getConsumable(id) {
  return Promise.resolve(consumables.find((c) => c.id === id));
}

function createConsumable(consumable) {
  id++;
  consumables = [...consumables, { ...consumable, id: id.toString() }];
  return Promise.resolve({ ...consumable, id: id.toString() });
}

function editConsumable(consumable) {
  consumables = consumables.map((c) =>
    c.id === consumable.id ? consumable : c
  );
  return Promise.resolve({ ...consumable });
}

const Service = {
  getConsumables,
  getConsumablesByType,
  getConsumable,
  createConsumable,
  editConsumable,
};

export default Service;
