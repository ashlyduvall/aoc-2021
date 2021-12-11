// https://adventofcode.com/2021/day/5
'use strict';

// let inputs = require('fs').readFileSync('./day_5_data_sample.txt').toString().split('\n')
let inputs = require('fs').readFileSync('./day_5_data.txt').toString().split('\n')
  , input_pairs = []
  , grid = []
  , max_x = 0
  , max_y = 0
  , count_of_overlapping_points = 0
;

inputs.pop();

function abs(x) {
    return x > 0 ? x : 0 - x;
}

for (let line of inputs) {
    let [ from, to ] = line.split(' -> ')
      , [ from_x, from_y ] = from.split(',')
      , [ to_x, to_y ] = to.split(',')
    ;

    from_x = parseInt(from_x);
    from_y = parseInt(from_y);
    to_x = parseInt(to_x);
    to_y = parseInt(to_y);

    // ensure from is before to
    if (from_x > to_x) {
        from_x = 0 - from_x
        to_x = 0 - to_x
    }

    if (from_y > to_y) {
        from_y = 0 - from_y
        to_y = 0 - to_y
    }
    
    input_pairs.push({from_x, from_y, to_x, to_y});
    max_x = (max_x > abs(from_x)) ? max_x : abs(from_x);
    max_x = (max_x > abs(to_x)) ? max_x : abs(to_x);
    max_y = (max_y > abs(from_y)) ? max_y : abs(from_y);
    max_y = (max_y > abs(to_y)) ? max_y : abs(to_y);
}

// Debug
console.log(input_pairs, 'Input pairs');
console.log(max_x, 'Max X co-ord');
console.log(max_y, 'Max Y co-ord');

// Fill grid
for (let x = 0; x <= max_x; x++) {
    for (let y = 0; y <= max_y; y++) {
        // Positions swapped here so that console.table plays nice
        grid[y] = grid[y] || [];
        grid[y][x] = 0;
    }
}

// console.table(grid);

// Now populate the grid
for (let pair of input_pairs) {
    let { from_x, from_y, to_x, to_y } = pair;

    if (from_x == to_x) {
        for (let y = from_y; y <= to_y; y++) {
            // Positions swapped here so that console.table plays nice
            let abs_y = abs(y)
              , abs_x = abs(to_x)
            ;
            grid[abs_y][abs_x]++;
        }
    } else if (from_y == to_y) {
        for (let x = from_x; x <= to_x; x++) {
            // Positions swapped here so that console.table plays nice
            let abs_y = abs(to_y)
              , abs_x = abs(x)
            ;
            grid[abs_y][abs_x]++;
        }
    // Fun new diagonal edge case!
    } else {
        for (let x = from_x, y = from_y; x <= to_x && y <= to_y; x++, y++) {
            // Positions swapped here so that console.table plays nice
            let abs_y = abs(y)
              , abs_x = abs(x)
            ;
            grid[abs_y][abs_x]++;
        }
    }
}

// Now count points with multiple overlaps
for (let x = 0; x <= max_x; x++) {
    for (let y = 0; y <= max_y; y++) {
        if (grid[y][x] > 1) {
            count_of_overlapping_points++;
        }
    }
}

// console.table(grid);
console.log(`Count of overlapping points: ${count_of_overlapping_points}`);
