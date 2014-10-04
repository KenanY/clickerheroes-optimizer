var damage = require('./damage');
var cost = require('./cost');

function info(hero, level, argaiv, mined) {
  var res = null;
  var dmg = damage(hero, level, argaiv);

  for (var i = level + 1; i < level + 250; i++) {
    var ed = damage(hero, i, argaiv) - dmg;
    if (ed < mined) {
      continue;
    }

    var ec = cost(hero, level, i);
    if (!res || ed / ec > res.ratio) {
      res = {
        hero: hero,
        level: i,
        ratio: ed / ec,
        cost: ec
      };
    }
  }

  for (var i = Math.floor((level + 250) / 25) * 25; i < level + 2000; i += 25) {
    var ed = damage(hero, i, argaiv) - dmg;
    if (ed < mined) {
      continue;
    }

    var ec = cost(hero, level, i);
    if (!res || ed / ec > res.ratio) {
      res = {
        hero: hero,
        level: i,
        ratio: ed / ec,
        cost: ec
      };
    }
  }

  return res;
}

module.exports = info;