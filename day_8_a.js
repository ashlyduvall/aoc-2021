// https://adventofcode.com/2021/day/7
'use strict';

// let inputs = require('fs').readFileSync('./day_8_data_sample.txt').toString().split('\n');
let inputs = require('fs').readFileSync('./day_8_data.txt').toString().split('\n');

inputs.pop();

let digitLengths = {
  '1': 2,
  '2': 5,
  '3': 5,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 3,
  '8': 7,
  '9': 6,
  '0': 6
};

// Start by just counting the output values for 1, 4, 7 and 8
let count = 0;
for (let input of inputs) {
  let [ string_of_inputs, string_of_outputs ] = input.split(' | ')
    , array_of_inputs = string_of_inputs.split(' ')
    , array_of_outputs = string_of_outputs.split(' ')
  ;

  for (let output of array_of_outputs) {
    switch (output.length) {
      case 2: // 1
      case 3: // 7
      case 4: // 4
      case 7: // 8
        count++;
    }
  }
}

console.log(`Values appear in output ${count} times.`);
