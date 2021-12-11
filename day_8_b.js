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

/*

 aaaa
b    c
b    c
 dddd
e    f
e    f
 gggg

*/

// Return a string containing characters from a that are not in b
function get_string_not_in(a, b){
  let ret = '';
  a = a.split('');

  for (let i of a) {
    if (b.indexOf(i) == -1){
      ret += i;
    }
  }

  return ret;
}

function sort_string(s){
  return s.split('').sort().join('');
}

// Start by just counting the output values for 1, 4, 7 and 8
let total = 0;
for (let input of inputs) {
  let [ string_of_inputs, string_of_outputs ] = input.split(' | ')
    , array_of_inputs = string_of_inputs.split(' ')
    , array_of_outputs = string_of_outputs.split(' ')
  ;

  // Start by finding the combinations to 1, 4, 7 and 8 in the input
  let seq_1, seq_4, seq_7, seq_8, m_2_3_5 = [], m_6_9_0 = [], mappings = {};
  for (let inp of array_of_inputs) {
    inp = sort_string(inp);
    switch (inp.length){
      // 1
      case 2:
        seq_1 = inp;
        break;
      // 4
      case 4:
        seq_4 = inp;
        break;
      // 7
      case 3:
        seq_7 = inp;
        break;
      // 8
      case 7:
        seq_8 = inp;
        break;
      // 2, 3 or 5
      case 5:
        m_2_3_5.push(inp);
        break;
      // 6, 9 or 0
      case 6:
        m_6_9_0.push(inp);
        break;
    }
  }

  // The difference between 1 and 7 gets us the mapping for the top bar
  let map_a = get_string_not_in(seq_7, seq_1);
  mappings[map_a] = 'a';

  // 6 is the only 6 character digit which doesn't match 7
  let m_9_0 = [], seq_6;
  for (let n of m_6_9_0) {
    if (get_string_not_in(seq_7, n).length == 1) {
      seq_6 = n;
    } else {
      m_9_0.push(n);
    }
  }

  // 0 is the only character that doesn't match 4
  let seq_0, seq_9;
  for (let n of m_9_0) {
    if (get_string_not_in(seq_4, n).length == 1) {
      seq_0 = n;
    } else {
      seq_9 = n;
    }
  }

  // 3 is the only character which matches 1
  let seq_3, m_2_5 = [];
  for (let n of m_2_3_5) {
    if (get_string_not_in(seq_1, n).length == 0) {
      seq_3 = n;
    } else {
      m_2_5.push(n);
    }
  }

  // 5 matches up with 6
  let seq_5, seq_2;
  for (let n of m_2_5) {
    if (get_string_not_in(seq_6, n).length == 1) {
      seq_5 = n;
    } else {
      seq_2 = n;
    }
  }

  console.log({
    seq_0, seq_1, seq_2, seq_3, seq_4, seq_5, seq_6, seq_7, seq_8, seq_9
  });

  // Now print our output
  let output_digit_string = '';
  for (let out of array_of_outputs) {
    out = sort_string(out);
    switch(out) {
      case seq_0:
        output_digit_string += '0';
        break;
      case seq_1:
        output_digit_string += '1';
        break;
      case seq_2:
        output_digit_string += '2';
        break;
      case seq_3:
        output_digit_string += '3';
        break;
      case seq_4:
        output_digit_string += '4';
        break;
      case seq_5:
        output_digit_string += '5';
        break;
      case seq_6:
        output_digit_string += '6';
        break;
      case seq_7:
        output_digit_string += '7';
        break;
      case seq_8:
        output_digit_string += '8';
        break;
      case seq_9:
        output_digit_string += '9';
        break;
    }
  }
  let output_digits = parseInt(output_digit_string);
  total += output_digits;
}
console.log(`Final total: ${total}`);
