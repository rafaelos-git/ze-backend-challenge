const path = require('path');
const fs = require('fs');
const database = require('..');
const PdvModel = require('../../models/pdv.model');

// Seed pdvs
const seedPdvs = async () => {
  const Pdv = new PdvModel(database).create();

  const file = fs.readFileSync(path.resolve(__dirname, './pdvs.json'));
  const seeds = JSON.parse(file);
  const { pdvs } = seeds;

  await Pdv.create(pdvs);
};

// Self invoked function to seed database
(async function seed() {
  try {
    await seedPdvs();
  } catch (e) {
    console.log('Error to seed database', e);
  }

  await database.disconnect();
}());
