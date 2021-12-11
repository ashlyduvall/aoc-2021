// https://adventofcode.com/2021/day/6
'use strict';

const DAYS_TO_FIRST_SPAWN = 8
    , DAYS_TO_NEXT_SPAWN = 6
    , NUMBER_OF_DAYS = 256 // example: 18, a: 80, b: 256
;

// let inputs = require('fs').readFileSync('./day_6_data_sample.txt').toString().split('\n');
let inputs = require('fs').readFileSync('./day_6_data.txt').toString().split('\n');
inputs = inputs[0].split(',').map(d => parseInt(d));

let fish_ages = [0, 0, 0, 0, 0, 0, 0, 0, 0];

for (let age_of_fish of inputs) {
  fish_ages[age_of_fish]++;
}

function sum(array){
  return array.reduce((a, b) => a + b, 0);
}

// Simulate days
for (let day = 0; day <= NUMBER_OF_DAYS; day++) {
  console.log(`Day ${day}: ${sum(fish_ages)} fish.`);

  let fish_spawning_today = fish_ages.shift();

  // Put babies at the end
  fish_ages.push(fish_spawning_today);
  fish_ages[6] += fish_spawning_today;
}
