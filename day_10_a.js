// https://adventofcode.com/2021/day/10
'use strict';

// let inputs = require('fs').readFileSync('./day_10_data_sample.txt').toString().split('\n');
let inputs = require('fs').readFileSync('./day_10_data.txt').toString().split('\n');

inputs.pop();
console.log({ inputs });

function get_closing_char(c) {
  switch (c) {
    case '[':
      return ']';
    case '<':
      return '>';
    case '{':
      return '}';
    case '(':
      return ')';
  }
}

function is_opening_character(c) {
  switch (c) {
    case '[':
    case '<':
    case '{':
    case '(':
      return true;
    default:
      return false;
  }
}

let line_no = 1
  , syntax_errors = []
;
for (let input of inputs) {
  let line = input.split("")
    , ancestor_object = []
    , ancestor_sequence = [ancestor_object]
    , open_sequence = []
    , character_no = 1
  ;

  for(let character of line) {
    if (is_opening_character(character)) {
      let this_object = []
        , last_parent = ancestor_sequence[ancestor_sequence.length - 1]
      ;
      open_sequence.push(character);
      last_parent.push(this_object);
      ancestor_sequence.push(this_object);
    } else {
      let expected_close = get_closing_char(open_sequence.pop());
      if (expected_close !== character) {
        syntax_errors.push(character);
        console.log(`Error at character ${character_no} of line ${line_no} - Expected ${expected_close} but found ${character} instead`);
        break;
      }
      ancestor_sequence.pop();
    }
    character_no++;
  }

  // console.log(JSON.stringify(ancestor_object));

  line_no++;
}

let error_score = syntax_errors.map(s => {
  switch (s){
    case ')':
      return 3;
    case ']':
      return 57;
    case '}':
      return 1197;
    case '>':
      return 25137;
  }
}).reduce((a, b) => a + b,0);

console.log({ error_score });
