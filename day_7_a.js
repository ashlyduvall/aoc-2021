// https://adventofcode.com/2021/day/7
'use strict';

// let crabs = require('fs').readFileSync('./day_7_data_sample.txt').toString().split('\n');
let crabs = require('fs').readFileSync('./day_7_data.txt').toString().split('\n');
crabs = crabs[0].split(',').map(d => parseInt(d));

console.log({ crabs });

function abs(i) {
  return i > 0 ? i : 0 - i;
}

// Get minimum and maximum horizontal positions
let min = 0, max = 0;
for (let crab of crabs) {
  min = crab < min ? crab : min;
  max = crab > max ? crab : max;
}

console.log({ min, max });

// Determine sum of distances from points in this range
let distances = {};
for (let h = min; h <= max; h++) {
  for (let crab of crabs) {
    distances[h] = distances[h] || 0;
    distances[h] += abs(crab - h);
  }
}

console.log({ distances });

// Find the lowest distance
let least_fuel_position = 0
  , least_fuel = Infinity
;
for (let horizontal_position in distances) {
  let total_fuel = distances[horizontal_position];
  if (total_fuel < least_fuel) {
    least_fuel_position = horizontal_position;
    least_fuel = total_fuel;
  }
}

console.log({ least_fuel_position, least_fuel });
