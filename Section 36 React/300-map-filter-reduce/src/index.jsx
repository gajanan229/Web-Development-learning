import emojipedia from "./emojipedia";

var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.

function double(x) {
  return x * 2;
}
const newNumbers = numbers.map(double);
console.log(newNumbers);

var newNumbers1 = [];
numbers.forEach(function (x) {
  newNumbers1.push(x * 2);
});
console.log(newNumbers1);

const newNumbers2 = numbers.map(function (x) {
  return x * 2;
});
console.log(newNumbers2);

//Filter - Create a new array by keeping the items that return true.

const newNumbers3 = numbers.filter(function(num) {
    return num < 10;
});
console.log(newNumbers3);

var newNumbers4 = [];
numbers.forEach(function(num) {
    if (num < 10) {
        newNumbers4.push(num);
    }
})
console.log(newNumbers4);


//Reduce - Accumulate a value by doing something to each item in an array.

var newNumber6 = 0;
numbers.forEach(function (currentNumber) {
    newNumber6 += currentNumber
})
console.log(newNumber6);

var newNumber5 = numbers.reduce(function (accumulator, currentNumber) {
    console.log("accumulator = " + accumulator);
    console.log("currentNumber = " + currentNumber);
    return accumulator + currentNumber;
})
console.log(newNumber5);

//Find - find the first item that matches from an array.

const newNumber7 = numbers.find(function (num) {
    return num > 10;
})
console.log(newNumber7);

//FindIndex - find the index of the first item that matches.

const newNumber8 = numbers.findIndex(function (num) {
    return num > 10;
})

console.log(newNumber8);


// practice 

const newEmojipedia = emojipedia.map(function (entry) {
    return entry.meaning.substring(0,100);
});
console.log(newEmojipedia);