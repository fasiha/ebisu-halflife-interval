var test = require('tape');
var ebisu = require('ebisu-js');
var lib = require('./index');

function relativeError(actual, expected) { return Math.abs((actual - expected) / expected); }

test('halflife', t => {
  for (let hl of [1e-2, 1e-1, 1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6]) {
    for (let alphaBeta of [2, 3, 5, 10, 20]) { // 50 will cause numerical problems here
      let model = ebisu.defaultModel(hl, alphaBeta);
      let interval50 = lib(model, 0.5);
      t.ok(relativeError(interval50, hl) < 1e-4);
      for (let prob of [.01, 0.05, 0.25]) { t.ok(lib(model, prob) > interval50); }
      for (let prob of [.55, .75, .9, .99]) { t.ok(lib(model, prob) < interval50); }
    }
  }
  t.end();
});

test('opts', t => {
  let r =
      lib(ebisu.defaultModel(24, 3, 3), 0.5, {tolerance: 1e-4, lowerBound: 1e-10, upperBound: 100, maxIterations: 100});
  t.ok(r);
  t.end();
});

test('no prob', t => {
  let r = lib(ebisu.defaultModel(24, 3, 3));
  t.ok(r);
  t.ok(relativeError(r, 24) < 1e-4)
  t.end();
})