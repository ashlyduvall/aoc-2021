// https://adventofcode.com/2021/day/4
'use strict';

// let inputs_numbers = require('fs').readFileSync('./day_4_data_numbers_sample.txt').toString().split('\n')
//  , inputs_boards = require('fs').readFileSync('./day_4_data_boards_sample.txt').toString().split('\n\n')
let inputs_numbers = require('fs').readFileSync('./day_4_data_numbers.txt').toString().split('\n')
  , inputs_boards = require('fs').readFileSync('./day_4_data_boards.txt').toString().split('\n\n')
  , called_numbers = []
  , number_of_rows = 0
  , number_of_columns = 0
;

inputs_numbers.pop();
inputs_boards.pop();

// split numbers appropriately
inputs_numbers = inputs_numbers[0].split(",").map(n => parseInt(n));

// split boards appropriately
inputs_boards = inputs_boards.map(board => {
    let columns = board.split("\n").map(row => {
        let parsed_row = row.split(/[\s]{1,2}/g).map(value => parseInt(value)).filter(value => !isNaN(value));
        number_of_rows = parsed_row.length;
        return parsed_row;
    });
    number_of_columns = columns.length;
    return columns;
});

// console.log(inputs_numbers);
for (let board_number in inputs_boards){
    let board = inputs_boards[board_number];
    console.log(`Board ${parseInt(board_number) + 1}`);
    console.table(board);
}

// Functions
function number_has_been_called(number) {
    return called_numbers.indexOf(number) > -1;
}

function column_is_complete(board, column_number) {
    for (let row of board) {
        if (!number_has_been_called(row[column_number])){
            return false;
        }
    }
    return true;
}

function row_is_complete(row) {
    for (let value of row) {
        if (!number_has_been_called(value)){
            return false;
        }
    }
    return true;
}

function board_is_complete(board) {
    for (let row of board) {
        if (row_is_complete(row)){
            return true;
        }
    }

    for (let i = number_of_columns; i > 0; i--) {
        if (column_is_complete(board, i)) {
            return true;
        }
    }
    
    return false;
}

function get_uncalled_numbers(board) {
    let ret = [];

    for (let row of board) {
        for (let value of row) {
            if (!number_has_been_called(value)) {
                ret.push(value);
            }
        }
    }

    return ret;
}

function sum_of_array(array) {
    return array.reduce((a, b) => a + b, 0);
}

let last_winning_board = null
  , last_winning_board_number = null
  , last_number = null
;

// Solve the puzzle
for (let number of inputs_numbers) {
    called_numbers.push(number);
    console.log(`Round ${called_numbers.length} - ${number}`);

    for (let board_number in inputs_boards) {
        let board = inputs_boards[board_number];

        if (board && board_is_complete(board)) {
            console.log(`Board ${parseInt(board_number) + 1} has just won!`);
            last_winning_board = board;
            last_winning_board_number = board_number;
            last_number = number;
            inputs_boards[board_number] = 0;

            if (sum_of_array(inputs_boards.map(b => !!b)) == 0){
                break;
            }
        }
    }

    if (sum_of_array(inputs_boards.map(b => !!b)) == 0){
        break;
    }
}

console.log(`Board ${parseInt(last_winning_board_number) + 1} is the last winning board!`);
console.table(last_winning_board);

let uncalled_numbers = get_uncalled_numbers(last_winning_board)
  , total = sum_of_array(uncalled_numbers)
;

console.log(`All numbers: ${inputs_numbers.toString()}`);
console.log(`Called numbers: ${called_numbers.toString()}`);
console.log(`Uncalled numbers: ${uncalled_numbers.toString()}`);
console.log();
console.log(`Sum of uncalled is: ${total}`);
console.log(`Last called number is: ${last_number}`);
console.log(`Score is: ${total * last_number}`);
process.exit(0);
