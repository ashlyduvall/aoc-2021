// https://adventofcode.com/2021/day/5
'use strict';

// let inputs = require('fs').readFileSync('./day_5_data_sample.txt').toString().split('\n')
let inputs = require('fs').readFileSync('./day_5_data.txt').toString().split('\n')
  , input_pairs = []
  , valid_input_pairs = []
  , grid = []
  , max_x = 0
  , max_y = 0
  , count_of_overlapping_points = 0
;

inputs.pop();

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
        let x = to_x;
        to_x = from_x;
        from_x = x;
    }

    if (from_y > to_y) {
        let y = to_y;
        to_y = from_y;
        from_y = y;
    }
    
    input_pairs.push({from_x, from_y, to_x, to_y});
    max_x = (max_x > to_x) ? max_x : to_x;
    max_y = (max_y > to_y) ? max_y : to_y;
}

valid_input_pairs = input_pairs.filter(pair => pair.from_x == pair.to_x || pair.from_y == pair.to_y);

// Debug
console.log(valid_input_pairs, 'Valid input pairs');
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

//console.table(grid);

// Now populate the grid
for (let pair of valid_input_pairs) {
    let { from_x, from_y, to_x, to_y } = pair;
    for (let x = from_x; x <= to_x; x++) {
        for (let y = from_y; y <= to_y; y++) {
            // Positions swapped here so that console.table plays nice
            grid[y][x]++;
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
