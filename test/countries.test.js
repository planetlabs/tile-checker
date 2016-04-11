'use strict'

const expect = require('code').expect;
const lab = exports.lab = require('lab').script();
const countries = require('../lib/countries');

lab.experiment('getCCA3()', _ => {

  const getCCA3 = countries.getCCA3;

  lab.test('gets a cca3 code given an official country name', done => {
    expect(getCCA3('People\'s Republic of China')).to.equal('CHN');
    done();
  });

  lab.test('gets a cca3 code given a common country name', done => {
    expect(getCCA3('United States')).to.equal('USA');
    done();
  });

  lab.test('gets a cca3 code given a cca3 code', done => {
    expect(getCCA3('USA')).to.equal('USA');
    done();
  });

  lab.test('ignores case', done => {
    expect(getCCA3('china')).to.equal('CHN');
    expect(getCCA3('usa')).to.equal('USA');
    done();
  });

  lab.test('throws if a name is not found', done => {
    expect(_ => getCCA3('foo')).to.throw('No country found for "foo"');
    done();
  });

});

lab.experiment('getFeature()', _ => {

  const getFeature = countries.getFeature;

  lab.test('gets a GeoJSON feature given a cca3 code', done => {
    const feature = getFeature('CHN');
    expect(feature.type).to.equal('Feature');
    expect(feature).to.include('geometry');
    expect(feature.geometry.type).to.equal('MultiPolygon');
    done();
  });

  lab.test('throws if a cca3 code is not found', done => {
    expect(_ => getFeature('foo')).to.throw('Failed to find data for cca3: foo');
    done();
  });

});
