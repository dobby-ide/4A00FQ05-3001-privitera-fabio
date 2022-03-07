// - findIndex
const myArray = ['alpha', 'beta', 'gamma', 'delta', 'delta++'];
//creating a function that returns true if the word is longer than 4 letters:
const wordLongThanFour = (word) => word.length > 4;
//applying findIndex to myArray to check for the first element that satisfies the above created function
console.log(myArray.findIndex(wordLongThanFour)); //returns 0 since 'alpha is longer than 4 letters'

// - indexOf

const cars = [
  //array where 2 cars of the same team are included
  'Ferrari',
  'McLaren',
  'Mercedes',
  'Red Bull',
  'Alpha Tauri',
  'Alfa Romeo',
  'Ferrari',
  'McLaren',
  'Mercedes',
  'Red Bull',
  'Alpha Tauri',
  'Alfa Romeo',
];

console.log(cars.indexOf('Alfa Romeo'));
console.log(cars.indexOf('Ferrari', 1)); //it searches the element "Ferrari" after index 0

// - includes
console.log(cars.includes('Ferrari')); //output true because "Ferrari" is included
console.log(cars.includes('Ferrari ')); //output false because "Ferrari " is not included

// - some
//creating a function that returns true if a letter is included inside an element of the array

const letterIsIncluded = (letter) => letter.includes('B');
console.log(cars.some(letterIsIncluded)); //return true ("B" is in "Red Bull")
const letterIsIncluded2 = (letter) => letter.includes('b');
console.log(cars.some(letterIsIncluded2)); //return false ("b" is nowhere)
