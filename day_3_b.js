// From https://adventofcode.com/2021/day/3
'use strict';

let inputs = require('fs').readFileSync('./day_3_data.txt').toString().split('\n')
//let inputs = require('fs').readFileSync('./day_3_sample_data.txt').toString().split('\n')
  , number_of_columns = inputs[0].length
;
inputs.pop();

function filter_array_on_column_equals(array, column, value) {
  return array.filter(x => x[column] == value);
}

function get_most_common_value_in_column(array, column) {
  let count_of_ones = 0
    , maximum_possible = array.length
  ;

  for (let value of array) {
    count_of_ones += value[column] == '1';
  }

  return (count_of_ones >= maximum_possible / 2) ? '1' : '0';
}

function get_least_common_value_in_column(array, column) {
  let count_of_ones = 0
    , maximum_possible = array.length
  ;

  for (let value of array) {
    count_of_ones += value[column] == '1';
  }

  return (count_of_ones < maximum_possible / 2) ? '1' : '0';
}

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

// console.log(inputs);
// console.log(filter_array_on_column_equals(inputs, 0, '1'));
// console.log(get_most_common_value_in_column(inputs, 0));

// Find oxygen
let oxygen_set = inputs;
for (
  let oxygen_column_iterator = 0; 
  oxygen_set.length > 1 && oxygen_column_iterator < number_of_columns;
  oxygen_column_iterator++
) {
  let most_common = get_most_common_value_in_column(oxygen_set, oxygen_column_iterator);
  oxygen_set = filter_array_on_column_equals(oxygen_set, oxygen_column_iterator, most_common);
}
let oxygen = bin2dec(oxygen_set);
console.log(`Oxygen score: ${oxygen}`);

// Find CO2
let co2_set = inputs;
for (
  let co2_column_iterator = 0; 
  co2_set.length > 1 && co2_column_iterator < number_of_columns;
  co2_column_iterator++
) {
  let least_common = get_least_common_value_in_column(co2_set, co2_column_iterator);
  co2_set = filter_array_on_column_equals(co2_set, co2_column_iterator, least_common);
}
let co2 = bin2dec(co2_set);
console.log(`CO2 score: ${co2}`);

console.log(`Life support score: ${co2 * oxygen}`);
