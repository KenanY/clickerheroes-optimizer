var value = require('observ');
var array = require('observ-array');
var struct = require('observ-struct');

function hero(h) {
  return struct({
    title: value(h.name), // "name" conflicts with `Function.prototype.name`
    cost: value(h.cost),
    damage: value(h.damage),
    level: value(h.level),
    gilded: value(0)
  });
}

module.exports = array([
  hero({name: 'Tree Beast', cost: 50, damage: 5 * 20, level: 100}),
  hero({name: 'Ivan, the Drunken Brawler', cost: 250, damage: 22 * 20, level: 125}),
  hero({name: 'Brittany, the Beach Princess', cost: 1000, damage: 74 * 20, level: 75}),
  hero({name: 'The Wandering Fisherman', cost: 4000, damage: 245 * 8, level: 100}),
  hero({name: 'Betty Clicker', cost: 20000, damage: 976, level: 100}),
  hero({name: 'The Masked Samurai', cost: 100e3, damage: 3725 * 20, level: 75}),
  hero({name: 'Leon', cost: 400e3, damage: 10859 * 8, level: 75}),
  hero({name: 'The Great Forest Seer', cost: 2500e3, damage: 47143 * 20, level: 75}),
  hero({name: 'Alexa, the Assassin', cost: 15000e3, damage: 186e3 * 5.0625, level: 100}),
  hero({name: 'Natalia, Ice Apprentice', cost: 100e6, damage: 782e3 * 20, level: 75}),
  hero({name: 'Mercedes, Duchess of Blades', cost: 800e6, damage: 3721e3 * 20, level: 100}),
  hero({name: 'Bobby, Bounty Hunter', cost: 6500e6, damage: 17010e3 * 20, level: 100}),
  hero({name: 'Broyle Lindoven, Fire Mage', cost: 50e9, damage: 69480e3 * 10, level: 100}),
  hero({name: 'Sir George II, King\'s Guard', cost: 450e9, damage: 460e6 * 20, level: 100}),
  hero({name: 'King Midas', cost: 4e12, damage: 3017e6, level: 125}),
  hero({name: 'Referi Jerator, Ice Wizard', cost: 36e12, damage: 20009e6 * 20, level: 125}),
  hero({name: 'Abaddon', cost: 320e12, damage: 131e9 * 11.390625, level: 75}),
  hero({name: 'Ma Zhu', cost: 2.7e15, damage: 814e9 * 20, level: 75}),
  hero({name: 'Amenhotep', cost: 24e15, damage: 5335e9 * 2, level: 50}),
  hero({name: 'Beastlord', cost: 300e15, damage: 49143e9 * 8, level: 100}),
  hero({name: 'Athena, Goddess of War', cost: 9e18, damage: 1086e12 * 16, level: 100}),
  hero({name: 'Aphrodite, Goddess of Love', cost: 350e18, damage: 31124e12 * 16, level: 125}),
  hero({name: 'Shinatobe, Wind Deity', cost: 14e21, damage: 917e15 * 8, level: 100}),
  hero({name: 'Grant, the General', cost: 4199e21, damage: 202e18 * 4, level: 75}),
  hero({name: 'Frostleaf', cost: 2100e24, damage: 74698e18 * 4, level: 75})
]);