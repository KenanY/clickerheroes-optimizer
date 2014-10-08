/**
 * Get the cost of upgrading `hero` from level `from` to level `to`.
 *
 * @param  {Object} hero
 * @param  {Number} from
 * @param  {Number} to
 * @return {Number}
 */
function cost(hero, from, to) {
  return hero.cost * Math.pow(1.07, from) * (Math.pow(1.07, to - from) - 1) / 0.07;
}

module.exports = cost;