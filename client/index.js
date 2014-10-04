var document = require('global/document');
var value = require('observ');
var struct = require('observ-struct');
var mainLoop = require('main-loop');
var h = require('virtual-hyperscript');
var delegator = require('dom-delegator');
var parseSave = require('clickerheroes-save');
var MultipleEvent = require('geval/multiple');

var heroes = require('./heroes');
var damage = require('./damage');
var info = require('./info');
var format = require('./format');

var state = struct({
  save: value(''),
  heroes: heroes,
  argaiv: value(0),
  dogcog: value(0),
  output: value([]),
  events: MultipleEvent(['change'])
});

state.events.change(function(data) {
  updateData('save', state, data);
});

delegator();
var loop = mainLoop(state(), render);
document.body.appendChild(loop.target);
state(loop.update);

function render(state) {
  return h('.main', [
    h('.textarea', [
      h('p', 'Paste your ClickerHeroes save in the textarea below.'),
      h('textarea', {
        value: state.save,
        'ev-change': state.events.change,
        'ev-input': state.events.change
      }),
      h('pre', [
        h('span', state.save),
        h('br')
      ])
    ]),
    h('.table', [
      table(state)
    ]),
    h('.output', [
      list(state)
    ])
  ]);
}

function table(state) {
  var rows = [];

  state.heroes.forEach(function(hero) {
    rows.push(h('tr', [
      h('td', hero.title),
      h('td', String(hero.gilded)),
      h('td', String(hero.level))
    ]));
  });

  return h('table', [
    h('thead',
      h('tr', [
        h('th', 'Hero'),
        h('th', 'Gilded'),
        h('th', 'Level')
      ])
    ),
    h('tbody', rows)
  ]);
}

function list(state) {
  var ret = [];

  state.output.forEach(function(o) {
    ret.push(h('li', o));
  });

  return h('ul', ret);
}

function updateData(type, state, data) {
  state.save.set(data.target.value);

  var save;
  try {
    save = parseSave(state.save());
  }
  catch (e) {
    // invalid save
    return;
  }

  var savedHeroes = save.heroCollection.heroes;
  for (var k in savedHeroes) {
    var id = parseInt(k, 10);
    if (id < 2 || id > 26) {
      continue;
    }

    state.heroes.get(id - 2).level.set(savedHeroes[k].level);
    state.heroes.get(id - 2).gilded.set(savedHeroes[k].epicLevel);
  }

  compute(state);
}

function compute(struc) {
  var state = struc();
  var levels = [];
  var total = 0;
  state.heroes.forEach(function(hero) {
    levels.push(hero.level);
    total += damage(hero, hero.level, state.argaiv);
  });

  var currentInfo = [];
  state.heroes.forEach(function(hero) {
    currentInfo.push(info(hero, hero.level, state.argaiv, total * 0.01));
  });

  var output = [];
  for (var i = 0; i < 250; i++) {
    var best = -1;
    for (var j = 0; j < currentInfo.length; j++) {
      if (currentInfo[j] && (best < 0 || currentInfo[j].ratio > currentInfo[best].ratio)) {
        best = j;
      }
    }

    var combine = output.length - 1;
    if (combine >= 0 && output[combine].hero === currentInfo[best].hero) {
      var delta = damage(currentInfo[best].hero, currentInfo[best].level, state.argaiv)
                - damage(currentInfo[best].hero, output[combine].prev, state.argaiv);
      output[combine].level = currentInfo[best].level;
      output[combine].increase = 100 * delta / output[combine].total;
      output[combine].cost += currentInfo[best].cost;
    }
    else {
      var delta = damage(currentInfo[best].hero, currentInfo[best].level, state.argaiv)
                - damage(currentInfo[best].hero, levels[best], state.argaiv);
      output.push({
        hero: currentInfo[best].hero,
        level: currentInfo[best].level,
        prev: levels[best],
        cost: currentInfo[best].cost,
        increase: 100 * delta / total,
        total: total
      });
    }

    levels[best] = currentInfo[best].level;

    total = 0;
    state.heroes.forEach(function(hero, i) {
      total += damage(hero, levels[i], state.argaiv);
    });

    currentInfo[best] = info(state.heroes[best], levels[best], state.argaiv, total * 0.01);
  }

  var out = [];
  output.forEach(function(o) {
    out.push(o.level + ' - ' + o.hero.title + ' (' +
             format(o.cost * (1 - 0.02 * Math.min(25, state.dogcog))) +
             ' gold, ' + Math.round(o.increase) + '% damage)');
  });

  struc.output.set(out);
}