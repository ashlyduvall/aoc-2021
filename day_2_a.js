// From https://adventofcode.com/2021/day/2
'use strict';

const inputs = require('fs').readFileSync('./day_2_a_data.txt').toString().split('\n');

let horizontal_pos = 0
  , depth_pos = 0
;

for (let input of inputs){
  let [direction, amount] = input.split(" ");
  amount = parseInt(amount);

  if(isNaN(amount)){
    continue;
  }

  switch (direction){
    case "forward":
      horizontal_pos += amount;
      break;
    case "down":
      depth_pos += amount;
      break;
    case "up":
      depth_pos -= amount;
      break;
  }
}

console.log(`Depth: ${depth_pos}`);
console.log(`Horizontal Position: ${horizontal_pos}`);
console.log(`Final position: ${depth_pos * horizontal_pos}`);
