// https://adventofcode.com/2021/day/6
'use strict';

const DAYS_TO_FIRST_SPAWN = 8
    , DAYS_TO_NEXT_SPAWN = 6
    , NUMBER_OF_DAYS = 256 // example: 18, a: 80, b: 256
;

let inputs = require('fs').readFileSync('./day_6_data_sample.txt').toString().split('\n');
// let inputs = require('fs').readFileSync('./day_6_data.txt').toString().split('\n');
inputs = inputs[0].split(',').map(d => parseInt(d));

// Simulate days
for (let day = 0; day <= NUMBER_OF_DAYS; day++) {
  console.log(`Day ${day}: ${inputs.length} fish.`);
  for (
    let fish_number = 0, count_of_fish_at_day_start = inputs.length; 
    fish_number < count_of_fish_at_day_start;
    fish_number++
  ) {
    let fish_days_to_spawn = inputs[fish_number];

    if (fish_days_to_spawn == 0) {
      inputs[fish_number] = DAYS_TO_NEXT_SPAWN;
      inputs.push(DAYS_TO_FIRST_SPAWN);
    } else {
      inputs[fish_number]--;
    }
  }
}


