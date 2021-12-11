// https://adventofcode.com/2021/day/9
'use strict';

// let inputs = require('fs').readFileSync('./day_9_data_sample.txt').toString().split('\n');
let inputs = require('fs').readFileSync('./day_9_data.txt').toString().split('\n');

inputs.pop();
let heightmap = []
  , min_x = 0
  , max_x = inputs[0].length - 1
  , min_y = 0
  , max_y = inputs.length - 1
;

for (let row of inputs) {
  heightmap.push(row.split('').map(r => parseInt(r)));
}

// console.table(heightmap);

// functions
function get_pos(pos, x, y){
  switch (pos){ 
    case 'up':
      return y == 0 ? Infinity : heightmap[y - 1][x];
    case 'down':
      return y == max_y ? Infinity : heightmap[y + 1][x];
    case 'left':
      return x == 0 ? Infinity : heightmap[y][x - 1];
    case 'right':
      return x == max_x ? Infinity : heightmap[y][x + 1];
    default:
      throw new Error(`${pos} is not valid`);
  }
}

// Iterate
let low_points = [];
for (let y = 0; y <= max_y; y++) {
  for (let x = 0; x <= max_x; x++) {
    let height = heightmap[y][x]
      , left_height = get_pos('left', x, y)
      , right_height = get_pos('right', x, y)
      , down_height = get_pos('down', x, y)
      , up_height = get_pos('up', x, y)
    ;

    if (
      height < left_height &&
      height < right_height &&
      height < down_height &&
      height < up_height
    ) {
      low_points.push(height);
    }
  }
}

// console.log({ low_points });

// Get height scores
let risk_levels = low_points.map(x => x + 1);
// console.log({ risk_levels });

// Show total
let total_risk = risk_levels.reduce((a, b) => a + b, 0);
console.log(`Total risk: ${total_risk}`);
