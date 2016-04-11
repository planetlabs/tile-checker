'use strict'

const countries = require('world-countries');

const lookup = {};
countries.forEach(country => {
  const cca3 = country.cca3.toLowerCase();
  const common = country.name.common.toLowerCase();
  const official = country.name.official.toLowerCase();
  if (cca3 in lookup) {
    throw new Error(`Duplicate cca3: ${cca3}`);
  }
  lookup[cca3] = country;

  if (common in lookup) {
    throw new Error(`Duplicate common: ${common}`);
  }
  lookup[common] = country;

  if (official !== common && official in lookup) {
    throw new Error(`Duplicate official: ${official}`);
  }
  lookup[official] = country;
});


function getCCA3(name) {
  const key = name.toLowerCase();
  if (!(key in lookup)) {
    throw new Error(`No country found for "${name}"`);
  }
  return lookup[key].cca3;
}

function getFeature(cca3) {
  let data;
  try {
    data = require(`world-countries/data/${cca3.toLowerCase()}.geo.json`);
  } catch (_) {
    throw new Error(`Failed to find data for cca3: ${cca3}`);
  }
  if (!data.features) {
    throw new Error(`Expected a feature collection for: ${cca3}`);
  }
  if (data.features.length !== 1 || data.features[0].type !== 'Feature') {
    throw new Error(`Expected a single feature for: ${cca3}`);
  }
  return data.features[0];
}

exports.getCCA3 = getCCA3;
exports.getFeature = getFeature;
