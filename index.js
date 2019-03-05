var minimize = require('minimize-golden-section-1d');
var ebisu = require('ebisu-js');

const defaultOptions = {
  lowerBound: 0,
  tolerance: 1e-7,
  upperBound: Infinity,
  maxIterations: 1e4,
};

/**
 * Computes the time since last quiz that an Ebisu `model`'s recall probability drops to `probability`.
 *
 * If `probability = 0.5`, this time is a half-life.
 *
 * `options` are passed to [minimize-golden-section-1d](https://github.com/scijs/minimize-golden-section-1d#options)
 * library.
 *
 * @throws when search failed to converge (should never happen, let me know if it does)
 * @param {number[]} model the output of `ebisu.updateModel` or `ebisu.defaultModel` or something like that
 * @param {number} probability number > 0 and < 1
 * @param {Oject} options see `minimize-golden-section-1d` documentation. Sane defaults are provided.
 */
function interval(model, probability = 0.5, options = {}) {
  let status = {};
  options = Object.assign(defaultOptions, options)
  let res = minimize(elapsed => Math.abs(probability - ebisu.predictRecall(model, elapsed)), options, status);
  if (!status.converged || res < 0) { throw new Error('minimize failed to converge (nonsense interval)'); }
  return res;
}

module.exports = interval;