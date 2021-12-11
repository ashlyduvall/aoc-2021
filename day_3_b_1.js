// From https://adventofcode.com/2021/day/3
'use strict';

// let inputs = require('fs').readFileSync('./day_3_data.txt').toString().split('\n');
let inputs = require('fs').readFileSync('./day_3_sample_data.txt').toString().split('\n');
inputs.pop();
let total_numbers = inputs.length;
console.log(`Total numbers: ${total_numbers}`);

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

// Now filter the result set to find the oxygen and co2 ratings
// Oxygen
let oxygen_counts = [];

for (let total of totals_per_column) {
  if (total >= (total_numbers / 2)) {
    oxygen_counts.push('1');
  } else {
    oxygen_counts.push('0');
  }
}

console.log(oxygen_counts);

let oxygen_inputs = inputs;
for (let column_number in oxygen_counts) {
  let bit_value = oxygen_counts[column_number];
  console.log(oxygen_inputs);
  if (oxygen_inputs.length){
    oxygen_inputs = oxygen_inputs.filter(input => {
      return input.split("")[column_number] == bit_value;
    });
  }
}
console.log(oxygen_inputs);

// CO2
let co2_counts = [];

for (let total of totals_per_column) {
  if (total <= (total_numbers / 2)) {
    co2_counts.push('1');
  } else {
    co2_counts.push('0');
  }
}

console.log(co2_counts);

let co2_inputs = inputs;
for (let column_number in co2_counts) {
  let bit_value = co2_counts[column_number];
  if (co2_inputs.length > 1){
    co2_inputs = co2_inputs.filter(input => {
      return input.split("")[column_number] == bit_value;
    });
  }
}
console.log(co2_inputs);

function bin2dec(input){
  input = input[0].split("");
  let output = 0;
  while (input.length) {
    let bit = input.shift();

    output = output * 2;
    bit = parseInt(bit);
    if (isNaN(bit)) {
      continue;
    }
    output = output + bit;
  }
  return output;
}

let oxygen_dec = bin2dec(oxygen_inputs)
  , co2_dec = bin2dec(co2_inputs)
;

console.log(`Oxygen: ${oxygen_dec}`);
console.log(`CO2: ${co2_dec}`);
console.log(`Life support rating: ${oxygen_dec * co2_dec}`);
