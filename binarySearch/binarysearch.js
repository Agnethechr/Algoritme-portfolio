function binarySearch(searchFor, values) {
let min = 0;
let max = values.length - 1;
let iterations = 0;


while (min <= max) {
iterations++;
const middle = Math.floor((min + max) / 2);
const middleValue = values[middle];


if (middleValue === searchFor) {
return {
found: true,
index: middle,
iterations,
};
}


if (middleValue < searchFor) {
min = middle + 1;
} else if (middleValue > searchFor) {
max = middle - 1;
}
}


return {
found: false,
index: -1,
iterations,
};
}


module.exports = { binarySearch };