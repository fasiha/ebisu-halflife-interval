# ebisu-halflife-interval
This library is intended to be used as a complement to [Ebisu.js](https://fasiha.github.io/ebisu.js/), the JavaScript implementation of the public domain Bayesian quiz scheduler. See there for full installation and library instructions.

This library finds the time since last quiz that an Ebisu model's prediction of recall probability drops below some specified threshold, that is, the “interval” for a given model. The time for the recall probability to drop to 50% (or 0.5, as this library needs), can be called its *half-life*. The half-life is longer than the time it takes for recall probability to drop to 90%, but shorter than for it to drop to 10%.

To use this library, first run the following in your Node.js library:
```
$ npm install --save ebisu-halflife-interval
```
Then in your JavaScript code:
```js
var ebisuHalflifeInterval = require('ebisu-halflife-interval');
var model; // = ebisu.defaultModel(24, 3, 3)
var probability = 0.5;
var options = {};
var time = ebisuHalflifeInterval(model, probability, options);
```
where
- `model` is the Ebisu model (three numbers),
- `probability` is a number greater than 0 but less than 1, and
- `options` are passed to the [minimize-golden-section-1d](https://github.com/scijs/minimize-golden-section-1d#options) library.

**Caveat** This works by repeatedly calling `ebisu.predictModel` and therefore should be used sparingly.