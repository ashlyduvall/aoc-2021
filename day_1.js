// From https://adventofcode.com/2021/day/1
'use strict';

const inputs = require('fs').readFileSync('./day_1_data.txt').toString().split('\n');

// Part 1
function part1(){
  let last = Infinity
    , increments = 0
  ;

  for (let input of inputs){
    console.log(input)

    if (last < input) {
      console.log(`${input} greater than ${last}`)
      increments++;
    }
    last = input;
  }

  console.log(`The value increments ${increments} times.`)
}

// part1();

// Part 2
function part2() {
  let incrementor = 0
    , last_total = Infinity
    , set = []
    , sets_with_increments = 0
  ;
  
  for (let input of inputs){
    let set_index = incrementor % 3 ;
    input = parseInt(input);

    set[set_index] = input;
    incrementor++;

    if (incrementor > 2){
      // Get the sum of the current set
      let this_total = set.reduce((a, b) => a + b, 0);

      if (this_total > last_total){
        console.log(`${this_total} greater than ${last_total}`);
        sets_with_increments++;
      } else if (isNaN(this_total)) {
        console.log(this_total)
        console.log(input)
        console.log(typeof input)
        console.log(set)
      } else {
        console.log(`${this_total} smaller than ${last_total}`);
      }

      last_total = this_total;
    }
  }

  console.log(`${sets_with_increments} increments`);
}
// part2();
