// https://adventofcode.com/2021/day/11
'use strict';

// let inputs = require('fs').readFileSync('./day_11_data_sample.txt').toString().split('\n');
let inputs = require('fs').readFileSync('./day_11_data.txt').toString().split('\n');

inputs.pop();
inputs = inputs.map(row => row.split("").map(a => parseInt(a)));
console.table(inputs);

function increment(direction, x, y) {
  switch (direction){
    case 'top_left':
      x = x - 1;
      y = y - 1;
      break;
    case 'top':
      y = y - 1;
      break;
    case 'top_right':
      x = x + 1;
      y = y - 1;
      break;
    case 'left':
      x = x - 1;
      break;
    case 'right':
      x = x + 1;
      break;
    case 'bottom_left':
      x = x - 1;
      y = y + 1;
      break;
    case 'bottom':
      y = y + 1;
      break;
    case 'bottom_right':
      x = x + 1;
      y = y + 1;
      break;
    default:
      throw new Error(`${direction} not valid!`);
  }

  if (inputs[y] && inputs[y][x] && inputs[y][x] > 0) {
    inputs[y][x]++;
  }
}

function do_flash_at(x, y){ 
  increment('top_left', x, y);
  increment('top', x, y);
  increment('top_right', x, y);
  increment('left', x, y);
  increment('right', x, y);
  increment('bottom_left', x, y);
  increment('bottom', x, y);
  increment('bottom_right', x, y);
}

function increment_all() {
  for (let y = 0; y < inputs.length; y++) {
    let row = inputs[y];
    for (let x = 0; x < row.length; x++) {
      inputs[y][x]++;
    }
  }
}

function get_flashes() {
  let flashes_this_iteration = 0;

  for (let y = 0; y < inputs.length; y++) {
    let row = inputs[y];
    for (let x = 0; x < row.length; x++) {
      if (inputs[y][x] > 9) {
        inputs[y][x] = 0;
        flashes_this_iteration++;
        do_flash_at(x, y);
      }
    }
  }

  return flashes_this_iteration;
}

let steps = 100
  , flashes = 0
;

for(let step = 1; step <= steps; step++) {
  console.log(`Step ${step}`);
  // console.table(inputs);

  increment_all();
  let f;
  while (f = get_flashes()){
    // console.log(`Flashes this step: ${f}`);
    // console.table(inputs);
    flashes += f;
  }

  console.log(`Flashes so far: ${flashes}`);
}
