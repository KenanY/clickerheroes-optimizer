function damage(hero, level, argaiv) {
  var x10 = Math.min(Math.floor(level / 1000), 4);
  var x4 = Math.min(Math.max(Math.floor((level - 175) / 25), 0) - x10, 153);
  return hero.damage * (1 + (0.5 + 0.02 * argaiv) * hero.gilded) * level * Math.pow(4, x4) * Math.pow(10, x10);
}

module.exports = damage;