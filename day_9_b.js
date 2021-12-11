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

console.table(heightmap);

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

// Find lowest points
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
      low_points.push([x, y]);
    }
  }
}

console.log({ low_points });

// Spiral out from each lowest point to get each basin
let basins = [];

function fill_points_in_basin(x, y, basin) {
  let height = heightmap[y][x]
    , point_key = x + '_' + y
  ;

  // Already visited
  if (basin[point_key]) {
    return;
  // Is a border
  } else if (height == 9) {
    return;
  // Valid key
  } else {
    basin[point_key] = height;
    if (y > 0) {
      fill_points_in_basin(x, y - 1, basin);
    }

    if (y < max_y) {
      fill_points_in_basin(x, y + 1, basin);
    }

    if (x > 0) {
      fill_points_in_basin(x - 1, y, basin);
    }

    if (x < max_x) {
      fill_points_in_basin(x + 1, y, basin);
    }
  }
}

for (let [x, y] of low_points) {
  console.log({ x, y });
  let basin = {};
  fill_points_in_basin(x, y, basin);
  basins.push(basin);
}
console.log({basins});

let basin_areas = basins.map(b => Object.keys(b).length);
console.log({basin_areas});

let top_3 = basin_areas.sort((a, b) => a-b).reverse().slice(0, 3)
  , product = top_3.reduce((a, b) => a*b,1)
;
console.log({top_3});
console.log({product});
