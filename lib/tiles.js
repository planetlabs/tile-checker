'use strict'

const DEFAULT_RADIUS = 6378137;
const DEFAULT_TILE_SIZE = 256;

const defaults = {
  tileSize: DEFAULT_TILE_SIZE,
  origin: [-Math.PI * DEFAULT_RADIUS, Math.PI * DEFAULT_RADIUS],
  maxResolution: 2 * Math.PI * DEFAULT_RADIUS / DEFAULT_TILE_SIZE,
  yDown: true
}

function Grid(options) {
  Object.assign(this, defaults, options);
}

Grid.prototype.getResolution = function(z) {
  return this.maxResolution / Math.pow(2, z);
};

Grid.prototype.getTileRange = function(extent, z) {
  const resolution = this.getResolution(z);
  const unitsPerTile = this.tileSize * resolution;
  const minX = Math.floor((extent[0] - this.origin[0]) / unitsPerTile);
  const maxX = Math.floor((extent[2] - this.origin[0]) / unitsPerTile);
  let minY, maxY;
  if (this.yDown) {
    minY = Math.floor((this.origin[1] - extent[3]) / unitsPerTile);
    maxY = Math.floor((this.origin[1] - extent[1]) / unitsPerTile);
  } else {
    minY = Math.floor((extent[1] - this.origin[1]) / unitsPerTile);
    maxY = Math.floor((extent[3] - this.origin[1]) / unitsPerTile);
  }
  return [minX, minY, maxX, maxY];
};

Grid.prototype.getTileExtent = function(tileCoord) {
  const x = tileCoord[0];
  const y = tileCoord[1];
  const z = tileCoord[2];
  const resolution = this.getResolution(z);
  const unitsPerTile = this.tileSize * resolution;
  const left = this.origin[0] + (x * unitsPerTile);
  let bottom;
  if (this.yDown) {
    bottom = this.origin[1] - ((y + 1) * unitsPerTile)
  } else {
    bottom = this.origin[1] + (y * unitsPerTile)
  }
  return [
    left,
    bottom,
    left + unitsPerTile,
    bottom + unitsPerTile
  ];
};

exports.Grid = Grid;
