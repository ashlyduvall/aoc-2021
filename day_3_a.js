// From https://adventofcode.com/2021/day/3
'use strict';

const inputs = require('fs').readFileSync('./day_3_data.txt').toString().split('\n')
    , total_numbers = inputs.length
;

let totals_per_column = [];

for (let input of inputs) {
  input = input.split("");
  for (let column_number in input){
    let value = input[column_number];
    value = parseInt(value);

    if (isNaN(value)){
      continue;
    }

    totals_per_column[column_number] = totals_per_column[column_number] || 0;
    totals_per_column[column_number] += value;
  }
}

console.log(totals_per_column);
let final_output = [];

for (let total of totals_per_column) {
  if (total > (total_numbers / 2)) {
    final_output.push(1);
  } else if (total < (total_numbers / 2)) {
    final_output.push(0);
  } else {
    console.log('Undefined! Exactly half the numbers are 1!');
  }
}

console.log(final_output);
let gamma_rate = 0
  , epsilon_rate = 0
;

while (final_output.length) {
  let bit = final_output.shift();

  gamma_rate = gamma_rate * 2;
  epsilon_rate = epsilon_rate * 2;
  gamma_rate = gamma_rate + bit;
  epsilon_rate = epsilon_rate + !bit;
}

console.log(`Gamma rate: ${gamma_rate}`);
console.log(`Epsilon rate: ${epsilon_rate}`);
console.log(`Power consumption: ${gamma_rate * epsilon_rate}`);
