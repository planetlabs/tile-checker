'use strict'

const expect = require('code').expect;
const lab = exports.lab = require('lab').script();
const tiles = require('../lib/tiles');

lab.experiment('Grid', _ => {

  const Grid = tiles.Grid;

  lab.experiment('constructor', _ => {

    lab.test('creates a grid with common defaults', done => {
      const grid = new Grid();
      expect(grid.tileSize).to.equal(256);
      expect(grid.origin).to.deep.equal([-20037508.342789244, 20037508.342789244]);
      expect(grid.maxResolution).to.equal(156543.03392804097);
      expect(grid.yDown).to.equal(true);
      done();
    });

    lab.test('allows for a custom origin', done => {
      const grid = new Grid({origin: [0, 0]});
      expect(grid.tileSize).to.equal(256);
      expect(grid.origin).to.deep.equal([0, 0]);
      expect(grid.maxResolution).to.equal(156543.03392804097);
      expect(grid.yDown).to.equal(true);
      done();
    });

    lab.test('allows for y-up', done => {
      const grid = new Grid({origin: [0, 0], yDown: false});
      expect(grid.tileSize).to.equal(256);
      expect(grid.origin).to.deep.equal([0, 0]);
      expect(grid.maxResolution).to.equal(156543.03392804097);
      expect(grid.yDown).to.equal(false);
      done();
    });

  });

  lab.experiment('#getResolution()', _ => {

    lab.test('gets a resolution given a zoom level', done => {
      const grid = new Grid();
      expect(grid.getResolution(0)).to.equal(156543.03392804097);
      expect(grid.getResolution(10)).to.equal(152.8740565703525);
      done();
    });

    lab.test('assumes zoom factor of 2 and uses maxResolution', done => {
      const grid = new Grid({maxResolution: Math.pow(2, 18)});
      expect(grid.getResolution(0)).to.equal(262144);
      expect(grid.getResolution(18)).to.equal(1);
      done();
    });

  });

});
