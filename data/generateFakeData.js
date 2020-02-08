// Randomly generate a fake allMobils JSON file

const fs = require("fs");
const numMobils = Math.floor(Math.random() * 10) + 16; // 16 - 26 (exclusive)

let fakeMobils = [];
for (i = 1; i < numMobils; i++) {
  const chairs = Math.floor(Math.random() * 6) + 2; // 2-8 (exclusive)
  const name = `Mobil ${i}`;
  // const availability = [true, false][Math.round(Math.random())];
  const tipe = ["MPV", "Minibus"][Math.floor(Math.random() * 3)]; // 0-3 (exclusive)
  fakeMobils.push({
    name: name,
    capacity: chairs,
    // isAvailable: availability,
  
    tipe: tipe,
    harga: harga,
    isAvailable: true
  });
}

let data = JSON.stringify({
  mobils: fakeMobils
});
fs.writeFileSync(__dirname + "/allMobils.json", data);
