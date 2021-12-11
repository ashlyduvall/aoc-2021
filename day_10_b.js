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

let line_no = 0
  , incomplete_line_scores = []
;
for (let input of inputs) {
  let line = input.split("")
    , ancestor_object = []
    , ancestor_sequence = [ancestor_object]
    , open_sequence = []
    , line_is_corrupt = false
    , character_no = 1
  ;

  line_no++;

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
        console.log(`Error at character ${character_no} of line ${line_no} - Expected ${expected_close} but found ${character} instead`);
        line_is_corrupt = true;
        break;
      }
      ancestor_sequence.pop();
    }
    character_no++;
  }

  // Error found
  if (line_is_corrupt) {
    continue;
  }

  // No dangling prefixes
  if (open_sequence.length == 0) {
    continue;
  }

  console.log({open_sequence});

  let final_score = 0
    , dangling_open
  ;
  while (dangling_open = open_sequence.pop()) {
    let closing_character = get_closing_char(dangling_open)
      , closing_character_score
    ;

    switch (closing_character) {
      case ')':
        closing_character_score = 1;
        break;
      case ']':
        closing_character_score = 2;
        break;
      case '}':
        closing_character_score = 3;
        break;
      case '>':
        closing_character_score = 4;
        break;
    }

    final_score = final_score * 5;
    final_score = final_score + closing_character_score;
  }

  incomplete_line_scores.push(final_score);
}

incomplete_line_scores.sort((a, b) => a - b);
console.log({ incomplete_line_scores});

let total_scores = incomplete_line_scores.length
  , middle_index = Math.floor(total_scores / 2)
  , middle_score = incomplete_line_scores[middle_index]
;
console.log(`Middle score: ${middle_score}`);
